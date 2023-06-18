import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import './App.css';
import {useAuth} from './hooks/auth-hook'
import TripsList from './trips/pages/TripsList';
import Wheels from './wheels/pages/Wheels';
import Navigation from './navigation/pages/Navigation';
import PrivacyPolicy from './PrivacyPolicy';
import PasswordReset from './PasswordReset';
import TripAdmin from './trips/pages/TripAdmin';

function App() {

  const {user, login, logout} = useAuth();
  let routes;
  
  if (user) {    
    routes = (<Routes> 
      <Route path = "/wheels" element={<Wheels user = {user}/>} />
      <Route path = "/pp" element={<PrivacyPolicy/>} />
      <Route path = "/trips" element={<TripsList user = {user}/>} />
      <Route path = "/tripadmin/:tripId" element={<TripAdmin user = {user} />} />
    </Routes>);
   } else { 
    routes = (
    <Routes>    
      <Route path = "/trips" element={<TripsList />} />
      <Route path = "/pp" element={<PrivacyPolicy/>} />
      <Route path = "/passwordreset" element={<PasswordReset/>} />
      <Route path="*" element={<Navigate replace to= "/trips" />} />
    </Routes>);
   }
  return (
      <div className = "app">
        <div className = "app__header">
          <h1>Óriáskerék tájtúrák</h1>
          {user && <b>{user.email}</b>}
        </div>
        <Router>    
          <div className = "app__navbar">
            <Navigation user = {user} login = {login} logout = {logout} />
          </div>  
          <div className = "app__main">
            {routes}
          </div>
        </Router>
      </div>
  );
}

export default App;
