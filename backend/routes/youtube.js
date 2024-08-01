const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const ytdl = require('ytdl-core');
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// Generate an OAuth URL and redirect there
router.get('/auth', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });

  res.redirect(url);
});

// OAuth callback
router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Save the tokens for later use
  fs.writeFileSync('tokens.json', JSON.stringify(tokens));
  res.send('Authentication successful! You can close this tab.');
});

router.post('/download', async (req, res) => {
  const { url, format } = req.body;
  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;

  res.header('Content-Disposition', `attachment; filename="${title}.${format}"`);
  ytdl(url, { format }).pipe(res);
});

module.exports = router;
