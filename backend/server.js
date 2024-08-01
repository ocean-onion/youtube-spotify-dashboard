const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const youtubeRoutes = require('./routes/youtube');
const spotifyRoutes = require('./routes/spotify');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/youtube', youtubeRoutes);
app.use('/api/spotify', spotifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
