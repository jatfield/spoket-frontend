import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';
import Trip from './trips/pages/TripsList';
import Wheel from './wheels/pages/Wheel';

function App() {

  let routes = (          
    <Switch> {/*so it stops after picking a route*/}      
      <Route path = "/" exact>
        <Wheel wId = "5e3c5e94773ac27b33820203"/>
      </Route>
      <Route path="/meghallgatas/:hearingId" exact>
      </Route>
      <Route path="/meghallgatasok/konferenciarogzites" exact>
      </Route>
      <Route path="/epuletek/:buildingId/:floorId" exact>
      </Route>
      <Route path="/admin" exact>
      </Route>
      <Redirect to="/" />
    </Switch>)
  return (
      <div className = "app__header">
        <div className = "header">
          <h1>Spoket!</h1>
        </div>
        <Router>    
          <div className = "app__navbar">
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
