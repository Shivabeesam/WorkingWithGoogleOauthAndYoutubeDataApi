const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const CLIENT_ID =
  '1060017452566-qsafp07sg0tckq6pmpas40cdj3pshqgd.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000';

app.post('/exchange-token', async (req, res) => {
  const { authorizationCode } = req.body;

  try {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      querystring.stringify({
        code: authorizationCode,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    // Store tokens securely (e.g., in a database)
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);

    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
