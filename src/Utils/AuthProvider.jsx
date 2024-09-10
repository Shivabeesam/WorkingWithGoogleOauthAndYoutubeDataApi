import React from 'react';
import { useState, createContext } from 'react';

export const AuthContext = createContext();

const CLIENT_ID = 'your _client_id';
const CLIENT_SECRET = 'your_secret';
const REDIRECT_URI = 'your_redirect_uri';

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [data, setData] = useState(null);
  const [channelId, setChannelId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        data,
        setData,
        channelId,
        setChannelId,
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
