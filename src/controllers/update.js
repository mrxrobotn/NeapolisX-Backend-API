import { google } from 'googleapis';
import Heartrate from '../models/heartrate.js';
import cron from 'node-cron';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

async function updateHeartRate() {
    try {
        const now = new Date();
        const startTimeMillis = now.setDate(now.getDate() - 7);
        const endTimeMillis = Date.now();
        // Retrieve refresh token from the database (you need to implement getRefreshToken function)
        const refreshToken = await getRefreshToken();

        // Set the refresh token to the OAuth2 client
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        // Refresh the access token
        const { token } = await oauth2Client.getAccessToken();

        // Set the access token for the OAuth2 client
        oauth2Client.setCredentials({ access_token: token });

        // Now fetch heart rate data from Google Fit
        const fitness = google.fitness({ version: 'v1', auth: oauth2Client });
        const response = await fitness.users.dataSources.datasets.get({
            userId: 'me',
            dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
            datasetId: `${startTimeMillis}000000-${endTimeMillis}000000`,
        });

        // Process the heart rate data and update MongoDB
        const heartRateData = response.data; // Modify according to your response structure
        await Heartrate.updateOne({ $set: { heartRate: heartRateData } });

        console.log('Heart rate data updated successfully');
    } catch (error) {
        console.error('Error updating heart rate data:', error);
    }
}

// Function to get refresh token from the database
export async function getRefreshToken() {
    try {
        // Fetch the user (you can adjust this based on your system; using a static user ID for example purposes)
        const heartrate = await Heartrate.findOne();
        if (heartrate && heartrate.token) {
            return heartrate.token;
        } else {
            throw new Error("No refresh token found for the user");
        }
    } catch (error) {
        console.error("Error fetching refresh token:", error);
        throw error;
    }
}

cron.schedule('* * * * * *', () => {
    console.log('Running the heart rate update job');
    updateHeartRate();
});