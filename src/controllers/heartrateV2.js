import { google } from 'googleapis';
import Heartrate from '../models/heartrate.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const scopes = ['https://www.googleapis.com/auth/fitness.heart_rate.read'];

export function initiateOAuth(req, res) {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  console.log("OAuth URL:", url);
  res.redirect(url);
}

export async function handleOAuthCallback(req, res) {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store the refresh token in MongoDB if it exists
    if (tokens.refresh_token) {
      await Heartrate.updateOne(
        {}, // Update the single document (no userId required)
        { $set: { refreshToken: tokens.refresh_token } },
        { upsert: true } // Create the document if it doesn't exist
      );
    }

    res.send('Authentication successful. Automation started for heart rate updates.');
    
    // Start the automated heart rate updates
    startHeartRateAutomation();

  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).json({ error: 'Authentication failed.' });
  }
}

// Fetch heart rate data, use refresh token if necessary
async function fetchHeartRateData() {
  const fitness = google.fitness('v1');

  // Retrieve the stored refresh token from the single document
  const heartrateDoc = await Heartrate.findOne();
  if (!heartrateDoc || !heartrateDoc.refreshToken) {
    throw new Error('No refresh token found.');
  }

  oauth2Client.setCredentials({ refresh_token: heartrateDoc.refreshToken });
  await oauth2Client.getAccessToken(); // Automatically uses refresh token

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

    if (!heartRatePoints.length) {
      console.log('No heart rate data found.');
      return;
    }

    // Loop through and update MongoDB
    for (const point of heartRatePoints) {
      const heartRate = point.value[0].fpVal;
      await Heartrate.updateOne(
        {}, // Update the single document
        { $set: { heartRate: heartRate } }
      );
    }
  } catch (error) {
    console.error('Error fetching heart rate data:', error);
  }
}

function startHeartRateAutomation() {
  setInterval(() => {
    fetchHeartRateData().catch((err) => {
      console.error('Error in automated heart rate fetch:', err);
    });
  }, 5000); // Every 5 seconds
}

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