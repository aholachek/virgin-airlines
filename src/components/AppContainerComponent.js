'use strict';

import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import {VelocityTransitionGroup} from 'velocity-react';
import Velocity from 'velocity-animate';
import VelocityUI from 'velocity-animate/velocity.ui';

const mapStateToProps = (state, ownProps) => {
  return {state: state}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const routeConfig = [
  {
    route: 'dates-and-places',
    title: 'Search Flights'
  }, {
    route: 'flight-list',
    title: 'Pick a Flight'
  }, {
    route: 'customize',
    title: 'Customize'
  }
];

class AppContainerComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      backNav: false
    };
  }

  render() {

    //only animate top-level components
    var key = this.props.location.pathname.split("/").filter(function(path) {
      return path
    })[0];

    var currentPageIndex = _.findIndex(routeConfig, function(x) {
      return key === x.route
    });

    var prevPageLink,
      nextPageLink;

    if (currentPageIndex - 1 > -1) {
      var prevPage = routeConfig[currentPageIndex - 1];
      var prevPageLink = (
        <Link to={prevPage.route} className="item virgin-nav-item" onClick={function() {
          this.setState({backNav: true})
      }.bind(this)}>
      <div className="">
        <i className="icon chevron small left menu-chevron"/>{prevPage.title}
      </div>
    </Link>
      );
    } else {
      var prevPageLink = (
        <div className="item  virgin-nav-item"></div>
      )
    }

    if (currentPageIndex + 1 < routeConfig.length) {
      var nextPage = routeConfig[currentPageIndex + 1];
      var nextPageLink = (
        <Link to={nextPage.route} className="item virgin-nav-item" style={{
          minWidth: '110px'
        }} onClick={function() {
          this.setState({backNav: false})
        }.bind(this)}>
        <div className="pull-right">
          {nextPage.title}<i className="icon chevron small right menu-chevron"/>
        </div>
        </Link>
      )
    } else {
      var nextPageLink = (
        <div className="item virgin-nav-item"></div>
      )
    }

    var animationContainer;
    if (this.state.backNav) {
      console.log('back')
      animationContainer = (
        <VelocityTransitionGroup enter={{
          animation: 'transition.slideRightIn',
          duration: 300,
          delay: 200
        }} leave={{
          animation: 'transition.slideLeftOut',
          duration: 200
        }} runOnMount>
          {React.cloneElement(this.props.children, {key: key})}
        </VelocityTransitionGroup>
      )
    } else {

      animationContainer = (
        <VelocityTransitionGroup enter={{
          animation: 'transition.slideLeftIn',
          duration: 300,
          delay: 200
        }} leave={{
          animation: 'transition.slideRightOut',
          duration: 200
        }} runOnMount>
          {React.cloneElement(this.props.children, {key: key})}
        </VelocityTransitionGroup>
      )

    }

    return (
      <div className="appcontainer-component ui container">
        <nav className="ui top fixed menu virgin-nav" style={{
          height: '43px;'
        }}>
          <div style={{
            padding: '0px',
            overflow: 'hidden'
          }}></div>
          {prevPageLink}
          <img src="./../images/virgin-logo.png" alt="" className="virgin-nav-logo"/>
          {nextPageLink}
        </nav>
        <div style={{
          marginTop: '65px'
        }}>
          {animationContainer}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainerComponent)
