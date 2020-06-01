import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';
import {useAuth} from './hooks/auth-hook'
import TripsList from './trips/pages/TripsList';
import Wheels from './wheels/pages/Wheels';
import Navigation from './navigation/pages/Navigation';
import PrivacyPolicy from './PrivacyPolicy';
import TripAdmin from './trips/pages/TripAdmin';

function App() {

  const {user, login, logout} = useAuth();
  let routes;
  
  if (user) {    
    routes = (<Switch> {/*so it stops after picking a route*/} 
      <Route path = "/" exact>
        <Wheels user = {user}/>
      </Route>
      <Route path = "/wheels" >
        <Wheels user = {user}/>
      </Route>
      <Route path = "/pp" >
        <PrivacyPolicy/>
      </Route>
      <Route path = "/trips">
        <TripsList user = {user} />
      </Route>   
      <Route path = "/tripadmin/:tripId">
        <TripAdmin user = {user} />
      </Route>   
      <Redirect to="/" />
    </Switch>);
   } else { 
    routes = (
    <Switch>    
      <Route path = "/" exact>
        <TripsList />
      </Route>
      <Route path = "/pp" >
        <PrivacyPolicy/>
      </Route>
      <Redirect to="/" />
    </Switch>);
   }
  return (
      <div className = "app">
        <div className = "app__header">
          <h1>kalandkerekek.hu</h1>
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
