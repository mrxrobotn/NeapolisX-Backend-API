import express from 'express';
import {
  initiateOAuth,
  handleOAuthCallback,
  getHeartrateValue
} from '../controllers/heartrate.js';

const router = express.Router();

router.get('/', getHeartrateValue);

// Route to start OAuth 2.0 authorization
router.get('/auth', initiateOAuth);

// OAuth callback route to handle authorization response
router.get('/auth/callback', handleOAuthCallback);

export default router;