import { google } from 'googleapis';
import Heartrate from '../models/heartrate.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google Fit scopes for reading heart rate
const scopes = ['https://www.googleapis.com/auth/fitness.heart_rate.read'];

// Method to get heart rate from MongoDB
export function getHeartrateValue(req, res) {
  Heartrate.findOne()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Method to generate Google OAuth URL
export function initiateOAuth(req, res) {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    console.log("OAuth URL:", url);

    res.redirect(url);
  }

// Callback method to handle OAuth 2.0 response
export async function handleOAuthCallback(req, res) {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

     // Save tokens, particularly the refresh_token, into the database
    const token = tokens.refresh_token;

    // Fetch heart rate data and store it in the database
    await fetchHeartRateData(tokens.access_token);
    // Example of saving to MongoDB (assuming you have a User model)

    await Heartrate.updateOne({ $set: { token: token } });

    res.send('Heart rate data has been updated in the database.');
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).json({ error: 'Authentication failed.' });
  }
}

// Method to fetch heart rate data from Google Fit
async function fetchHeartRateData(accessToken) {
  const fitness = google.fitness('v1');

  try {
    const now = new Date();
    const startTimeMillis = now.setDate(now.getDate() - 7);
    const endTimeMillis = Date.now();

    const response = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      datasetId: `${startTimeMillis}000000-${endTimeMillis}000000`,
      auth: oauth2Client,
    });

    const heartRatePoints = response.data.point || [];

    // Loop through and update MongoDB
    for (const point of heartRatePoints) {
      const heartRate = point.value[0].fpVal; // Heart rate in bpm

      // Update MongoDB with heart rate data
      await Heartrate.updateOne(
        { 
            heartRate: heartRate,
        }
      );
    }
  } catch (error) {
    console.error('Error fetching heart rate data:', error);
  }
}

