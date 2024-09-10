import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { AuthContext } from '../Utils/AuthProvider';
import {
  getChannelDetails,
  fetchData,
  refreshAccessToken,
} from '../Services/YoutubeServices';
import { Container } from 'reactstrap';

const Homepage = () => {
  const {
    setAccessToken,
    refreshToken,
    setRefreshToken,
    CLIENT_ID,
    CLIENT_SECRET,
  } = useContext(AuthContext);
  const [channelDetails, setChannelDetails] = useState({
    subscriberCount: null,
    channelName: '',
    profilePicture: '',
  });

  const [searchText, setSearchText] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [channelList, setChannelList] = useState([]);

  const handleSearch = () => {
    setFetchTrigger((prev) => prev + 1);
    fetchData(sessionStorage.getItem('access_token'), searchText)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Add items to the list
          setChannelList(response.data.items); // Set the list of items in the state
          console.log(response.data.items);
          console.log(channelList);
        } else {
          console.error('Invalid response structure');
        }
      })
      .catch((error) => {
        console.log('error occured is' + error);
        if (error.response.status === 401) {
          console.error('Token expired, refreshing token...');
          const data = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          };
          refreshAccessToken(data) // Refresh the token when it expires
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
          fetchData();
        } else {
          console.error('Error fetching data:', error);
        }
      });
  };

  const fetchChannelDetails = async (accessToken, channelId) => {
    const details = await getChannelDetails(accessToken, channelId);
    setChannelDetails(details);
  };

  return (
    <div>
      <Container>
        <div className="serach-div">
          <FaYoutube style={{ height: '100px', width: '100px' }} />
          <h1 style={{ margin: 'auto' }}>Youtube Live Subscriber Count</h1>
          <input
            name="searchText"
            id="searchText"
            value={searchText}
            className="search-box"
            type="text"
            placeholder="Search Channel URL / Username..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="button" className="search-button">
            <FaSearch onClick={handleSearch} className="search-icon" />
          </button>
          <ul>
            {channelList.map((item, index) => (
              <li key={index}>
                {item.snippet.title} - {item.snippet.channelId}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img
            src={channelDetails.profilePicture}
            alt="Channel Thumbnail"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <h1 className="text-4xl font-semibold">
            {channelDetails.channelName}
          </h1>
          <div className="text-7xl font-bold">
            {channelDetails.subscriberCount !== null
              ? parseInt(channelDetails.subscriberCount).toLocaleString()
              : 'Loading...'}
          </div>
          <p className="text-xl">Subscribers</p>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
