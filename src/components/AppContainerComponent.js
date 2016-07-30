'use strict';

import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import {VelocityTransitionGroup} from 'velocity-react';
import Velocity from 'velocity-animate';
import VelocityUI from 'velocity-animate/velocity.ui';

import 'rc-drawer/assets/index.css';
import Drawer from 'rc-drawer';

const mapStateToProps = (state, ownProps) => {
  return {data : state}
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
      backNav: false,
      drawerOpen : false
    };
  }

  renderPriceButton (){
    let data = this.props.data;
    let price = 0;

    price += data.checkedBagsFrom * 25;
    price += data.checkedBagsTo * 25;
    if (data.powerTrip) price+= (79 * 2)
    if (data.plansChangePackage) price+= 25;

    if (data.departingFlight) {
      price+= _.findWhere(data.flights.departing, {id : data.departingFlight.id})
      .classes[data.departingFlight.class];
    }
    if (data.returningFlight) {
      price+= _.findWhere(data.flights.returning, {id : data.returningFlight.id})
      .classes[data.returningFlight.class];
    }

    if (price){
      return ( <button className='ui icon button total-cost compact pulse'
      key={ new Date().toString() }
      onClick={function(){this.setState({drawerOpen : !this.state.drawerOpen})}.bind(this)}
      >
          <i className='dollar icon'></i>{ price }
        </button>)
    }
    else {
      return ''
    }

  }

  renderSidebar(){

    let departingBlock, returningBlock, extrasBlock;
    const data = this.props.data;
    let departingFlightPrice = 0, returningFlightPrice = 0;
    let price = 0;

    if (data.departingFlight){
      let departingFlight = _.findWhere(data.flights.departing, { id : data.departingFlight.id });
      departingFlightPrice = departingFlight.classes[data.departingFlight.class];
      departingBlock =  departingFlight.leg1.departTime.format('ddd, D MMM') +
        '  ($' + departingFlightPrice + ')'
    }
    else {
      departingBlock =  'pick a flight!'
    }

    if (data.returningFlight){
      let returningFlight = _.findWhere(data.flights.returning, { id : data.returningFlight.id });
      returningFlightPrice = returningFlight.classes[data.returningFlight.class];
      returningBlock =  returningFlight.leg1.departTime.format('ddd, D MMM') +
        '  ($' + returningFlightPrice + ')'
    }
    else {
    returningBlock = 'pick a flight!'
    }

    price += data.checkedBagsFrom * 25;
    price += data.checkedBagsTo * 25;
    if (data.powerTrip) price+= (79 * 2)
    if (data.plansChangePackage) price+= 25;

    extrasBlock = '$' + price;

    return (<div>

          <button className='ui pull-right button tiny icon' style={{margin : '.5em'}}
          onClick={function(){this.setState({drawerOpen : false})}.bind(this)}
          >
          <i className='icon close'/>
          </button>
          <div className='main-container'>
            <div><b>Departing:</b>&nbsp;{departingBlock}</div>
            <div><b>Returning:</b>&nbsp;{returningBlock}</div>
            <div><b>Extras:</b>&nbsp;{extrasBlock}</div>
            <div className="ui divider"></div>

            <div><b>Total:</b>&nbsp;${(price + departingFlightPrice + returningFlightPrice) }</div>

        </div>

    </div>)
  }

  render() {

    //only animate top-level components
    var key = this.props.location.pathname.split('/').filter(function(path) {
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
        <Link to={prevPage.route} className='item virgin-nav-item' onClick={function() {
          this.setState({backNav: true})
      }.bind(this)}>
      <div className=''>
        <i className='icon chevron small left menu-chevron'/>{prevPage.title}
      </div>
    </Link>
      );
    } else {
      var prevPageLink = (
        <div className='item  virgin-nav-item'></div>
      )
    }

    if (currentPageIndex + 1 < routeConfig.length) {
      var nextPage = routeConfig[currentPageIndex + 1];
      let className = 'item virgin-nav-item';
      //super hacky way to prevent navigation to the right before all data is entered
      if (nextPage.route ===  'flight-list' && !this.props.data.returnDate){
      className += ' disabled'
      }
      else if (nextPage.route === 'customize' && !this.props.data.returningFlight) {
        className += ' disabled'

      }
      var nextPageLink = (
        <Link to={nextPage.route} className={className} style={{
          minWidth: '110px'
        }} onClick={function() {
          this.setState({backNav: false})
        }.bind(this)}>
        <div className='pull-right'>
          {nextPage.title}<i className='icon chevron small right menu-chevron'/>
        </div>
        </Link>
      )
    } else {
      var nextPageLink = (
        <div className='item virgin-nav-item'></div>
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

   const Sidebar = this.renderSidebar();

    return (

      <Drawer open={this.state.drawerOpen}
        position='bottom'
        sidebar={Sidebar}
        enableDragHandle={false}
        >
      <div className='appcontainer-component ui container'>

        <nav className='ui top fixed menu virgin-nav' style={{
          height: '43px;'
        }}>
          <div style={{
            padding: '0px',
            overflow: 'hidden'
          }}></div>
          {prevPageLink}
          <img src='./../images/virgin-logo.png' alt='' className='virgin-nav-logo'/>
          {nextPageLink}
        </nav>
        <div style={{
          marginTop: '65px'
        }}>
          {animationContainer}
        </div>
        { this.renderPriceButton() }
      </div>
    </Drawer>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainerComponent)
