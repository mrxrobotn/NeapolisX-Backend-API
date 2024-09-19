import express from 'express';
import {
  getHeartrateValue,
  initiateOAuth,
  handleOAuthCallback
} from '../controllers/heartrate.js';

const router = express.Router();

// Route to get heart rate data from MongoDB
router.get('/', getHeartrateValue);

// Route to start OAuth 2.0 authorization
router.get('/auth', initiateOAuth);

// OAuth callback route to handle authorization response
router.get('/auth/callback', handleOAuthCallback);

export default router;