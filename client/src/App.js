import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Wrapper, Content } from 'shared/layout';

import SignInPage from 'pages/SignIn';
import Addmin from "./pages/Addmin"
import SignUpPage from 'pages/SignUp';
import Homepage from 'pages/Homepage';
import ProfilesPage from 'pages/Profiles';
import ProfilePage from 'pages/Profile';
import SettingsPage from 'pages/Settings';
import EditProfilePage from 'pages/EditProfile';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import Alert from 'components/Alert';
import ModalSwitch from 'components/ModalSwitch';
import NotFoundPage from 'components/NotFoundPage';
import TweetPage from 'pages/Tweet';
import CreateTweetPage from 'pages/CreateTweet';
import Problemlist from 'pages/Problemlist';
import About from 'components/About';
import { Link} from 'react-router-dom';


function App() {

    const [solved, setSolved] = useState([{}])




  useEffect(() => {
    fetch('http://localhost:3001/admin')
      .then(response => response.json())
      .then(data=>setSolved(data))
     
      
  },[])

  return (
    <Router>
      <Wrapper>
        <Content>
          <Alert />
          <Header />
          <ModalSwitch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/addmin">
              <Addmin />
            </Route>
            <Route exact path="/addmin/main">
              <Problemlist />
            </Route>
            <Route path="/compose/tweet">
              <CreateTweetPage />
            </Route>
            <Route path="/:userId/status/:tweetId">
              <TweetPage />
            </Route>
            <PrivateRoute exact path="/edit-profile">
              <EditProfilePage />
            </PrivateRoute>
            <PrivateRoute exact path="/settings">
              <SettingsPage />
            </PrivateRoute>
            <Route exact path="/signin">
              <SignInPage />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route exact path="/profiles">
              <ProfilesPage solved={solved} />
            </Route>
            <Route path="/profile/:userId">
              <ProfilePage />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
            
          </ModalSwitch>
     
   
        </Content>
      </Wrapper>
    </Router>
  );
}

export default App;
