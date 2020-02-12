import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';
import {useAuth} from './hooks/auth-hook'
import Trip from './trips/pages/TripsList';
import Wheel from './wheels/pages/Wheel';
import Auth from './shared/components/Auth';

function App() {

  const {user, login, logout} = useAuth();
  let routes;
  
  if (user.isLoggedIn) {          
    routes = (<Switch> {/*so it stops after picking a route*/}      
      <Route path = "/" exact>
        <Wheel user = {user}/>
      </Route>
      <Route path="/rider/:spoketId" exact>
      </Route>
      <Redirect to="/" />
    </Switch>);
   } else {
    routes = (<Switch> {/*so it stops after picking a route*/}      
      <Route path = "/" exact>
        <Trip />
      </Route>
      <Redirect to="/" />
    </Switch>);
   }
  return (
      <div className = "app__header">
        <div className = "header">
          <h1>Spoket!</h1>
        </div>
        <Router>    
          <div className = "app__navbar">
          </div>  
          <div className = "app__main">
            <Auth user = {user} login = {login} logout = {logout} />
            {routes}
          </div>
          <div className = "app__footer">
          </div>
        </Router>
      </div>
  );
}

export default App;
