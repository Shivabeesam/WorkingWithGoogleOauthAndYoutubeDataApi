import axios from 'axios';

// const API_KEY = 'your_api_key';
// const CHANNEL_ID = 'channel_id';
export const getChannelDetails = async (accessToken, channelId) => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the OAuth access token here
      },
    }
  );
  console.log('Response after taking channel id ' + response);
  console.log(response.data);
  const data = response.data.items[0];
  console.log(data);

  return {
    subscriberCount: data.statistics.subscriberCount,
    channelName: data.snippet.title,
    profilePicture: data.snippet.thumbnails.default.url,
  };
};

// Exchange authorization code for access and refresh tokens
export const exchangeAuthorizationCode = async (data) => {
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  try {
    const response = await axios.post(tokenUrl, new URLSearchParams(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Access Token:', response.data.access_token);
    console.log('Refresh Token:', response.data.refresh_token);
    sessionStorage.setItem('access_token', response.data.access_token);
    sessionStorage.setItem('refresh_token', response.data.refresh_token);
    return response;
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
  }
};

// Refresh access token when it expires
export const refreshAccessToken = async (data) => {
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  try {
    const response = await axios.post(tokenUrl, new URLSearchParams(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('New Access Token:', response.data.access_token);
    console.log('New Refresh Token:', response.data.refresh_token);
    sessionStorage.setItem('access_token', response.data.access_token);
    sessionStorage.setItem('refresh_token', response.data.refresh_token);
    return response;
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};

export const fetchData = async (access_token, searchItem) => {
  try {
    console.log('sending access token ' + access_token);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${searchItem}&maxResults=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log('Fetched Data:', response.data);
    return response;
  } catch (error) {
    console.error('Error while fetching data:', error);
    return error;
  }
};

const API_KEY = 'Your api key';
const CHANNEL_ID = 'the channel id of which you want statistics';
export const getChannelDetailsWithApi_Key = async (searchItem) => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`
  );
  console.log(response);
  console.log(response.data);
  const data = response.data.items[0];
  console.log(data);

  return {
    subscriberCount: data.statistics.subscriberCount,
    channelName: data.snippet.title,
    profilePicture: data.snippet.thumbnails.default.url,
  };
};
