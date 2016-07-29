require('styles/App.less');

import React from 'react'
import {Router, Route, hashHistory, IndexRoute, IndexRedirect} from 'react-router'
import AppContainer from './AppContainerComponent'
import LandingPage from './LandingPageComponent'

import DatesAndPlacesPage from './DatesAndPlaces/DatesAndPlacesPageComponent'
import PreferencesPage from './Preferences/PreferencesPageComponent'
import FlightListPage from './FlightList/FlightListPageComponent'
import CustomizePage from './Customize/CustomizePageComponent'
import PurchasePage from './Purchase/PurchasePageComponent'


class AppComponent extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRedirect to="/dates-and-places/1"/>
          <Route path="/dates-and-places(/:subPage)" component={DatesAndPlacesPage}/>
          <Route path="/preferences" component={PreferencesPage}/>
          <Route path="/flight-list" component={FlightListPage}/>
          <Route path="/customize" component={CustomizePage}/>
          <Route path="/purchase" component={PurchasePage}/>
        </Route>
      </Router>

    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
