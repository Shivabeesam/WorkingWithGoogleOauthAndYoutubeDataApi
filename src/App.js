import './App.css';
import GoogleOauth from './Components/GoogleOauth';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import AuthProvider from './Utils/AuthProvider';

function App() {
  const isLoggedIn = !!sessionStorage.access_token;
  return (
    <div className="App">
      <Header />

      {/* 
      Tried to overcome quota limit of youtube api with Oauth .But turns out that this will also counted under quota . so stopped working on this 
      <AuthProvider>
        <Homepage />
      </AuthProvider>
      <AuthProvider>
        <GoogleOauth />
      </AuthProvider> */}
    </div>
  );
}

export default App;
