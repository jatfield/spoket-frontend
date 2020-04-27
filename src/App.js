import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';
import {useAuth} from './hooks/auth-hook'
import TripsList from './trips/pages/TripsList';
import Wheels from './wheels/pages/Wheels';
import Navigation from './navigation/pages/Navigation';

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
      <Route path = "/trips">
        <TripsList user = {user} />
      </Route>   
      <Route path="/rider/:spoketId" >
      </Route>
      <Redirect to="/" />
    </Switch>);
   } else { 
    routes = (
    <Switch> {/*so it stops after picking a route*/}    
      <Route path = "/" exact>
        <TripsList />
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
            {/*user && <MessageBox user = {user} />*/}
          </div>  
          <div className = "app__main">
            {routes}
          </div>
          <div className = "app__footer">
          </div>
        </Router>
      </div>
  );
}

export default App;
