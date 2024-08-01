const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();

const spotifyApi = new SpotifyWebApi({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URL'
});

// Generate an OAuth URL and redirect there
router.get('/auth', (req, res) => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read'
  ];

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(authorizeURL);
});

// OAuth callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    // Save the tokens for later use
    fs.writeFileSync('spotify_tokens.json', JSON.stringify(data.body));
    res.send('Authentication successful! You can close this tab.');
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

router.get('/stats', async (req, res) => {
  try {
    const data = await spotifyApi.getMyTopTracks();
    res.json(data.body);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

module.exports = router;
