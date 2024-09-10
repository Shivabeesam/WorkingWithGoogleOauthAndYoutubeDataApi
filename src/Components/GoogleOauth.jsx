import React, { useContext } from 'react';
import { useEffect } from 'react';
import { exchangeAuthorizationCode } from '../Services/YoutubeServices';
import { AuthContext } from '../Utils/AuthProvider';

const GoogleOauth = () => {
  const {
    accessToken,
    setAccessToken,
    setRefreshToken,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  } = useContext(AuthContext);

  // Initiate Google OAuth 2.0 flow
  const initiateOAuthFlow = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;
    window.location.href = authUrl; // Redirects the user to Google's authorization page
  };

  // This function runs when the component mounts and checks for the authorization code in the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode && !accessToken) {
      const data = {
        code: authorizationCode,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      };
      // If there's an authorization code in the URL, exchange it for an access token
      exchangeAuthorizationCode(data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token); // Save the refresh token
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Google OAuth 2.0 Authorization Code Flow</h1>
      {!accessToken && (
        <button onClick={initiateOAuthFlow}>Login with Google</button>
      )}
      {/* {accessToken && <button onClick={fetchData}>Fetch YouTube Data</button>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </div>
  );
};

export default GoogleOauth;
