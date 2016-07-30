'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {updateVariable} from 'actions/index'
import { Link } from 'react-router'

import SetLocation from './SetLocationComponent'
import SetDate from './SetDateComponent'
import Preferences from './../Preferences/PreferencesPageComponent'

import {VelocityTransitionGroup} from 'velocity-react';
import Velocity from 'velocity-animate';
import VelocityUI from 'velocity-animate/velocity.ui';

const mapStateToProps = (state, ownProps) => {
  return {data: state}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateVar: (data) => {
      dispatch(updateVariable(data))
    }
  }
}

const defaultDepartingFrom = 'Boston, MA (BOS)';
const defaultDepartingTo = 'New York/Kennedy, NY (JFK)';

class DatesAndPlacesPageComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      step: 0
    }
  }


  renderLocationBlock() {

    return (
      <div className="five wide column">

        <h4 className="ui horizontal divider header">Cities</h4>
        <span>
          {this.props.data.departingFrom
            ? (
              <div>
                <p>{this.props.data.tripType}&nbsp;:&nbsp;
                  <b>{this.props.data.departingFrom.match(/\((.*)\)/, '')[1]}</b>&nbsp;to&nbsp;
                  <b>{this.props.data.departingTo.match(/\((.*)\)/, '')[1]}</b>
                </p>
                <Link className="ui button basic fluid small" to="/dates-and-places/1">Change</Link>
              </div>
            )
            : ''
}
        </span>
      </div>
    )
  }

  renderDepartingBlock() {

    var departingBody = ''

    if (this.props.data.datesAndPlacesProgress >= 1) {

      if (this.props.data.departDate) {
        departingBody = (
          <span>
            <h4 className="ui horizontal divider header">Departing on</h4>
            <p className="bold">{this.props.data.departDate.toDateString()}</p>
            <Link className="ui button basic fluid small" to="/dates-and-places/2">Change</Link>
          </span>
        )
      } else {
        departingBody = (
          <span>
            <h4 className="ui horizontal divider header">Departing on</h4>
              <Link className="ui button fluid small secondary" to="/dates-and-places/2"> Pick a Departure Date</Link>
          </span>

        )
      }
    }

    return <div className="five wide column">
      {departingBody}
    </div>

  }

  renderReturningBlock() {
    var returningBody = ''

    if (this.props.data.datesAndPlacesProgress >= 2) {

      if (this.props.data.returnDate) {
        returningBody = (
          <span>
            <h4 className="ui horizontal divider header">Returning on</h4>
            <p className="bold">{this.props.data.returnDate.toDateString()}</p>
              <Link className="ui button basic fluid small" to="/dates-and-places/3">Change</Link>
          </span>
        )
      } else {
        returningBody = (
          <span>
            <h4 className="ui horizontal divider header">Returning on</h4>
              <Link className="ui button fluid small secondary" to="/dates-and-places/3">Pick a Return Date</Link>
          </span>
        )
      }
    }

    return <div className="five wide column">
      {returningBody}
    </div>

  }

  renderPreferencesBlock() {

    var preferencesBody = ''

    if (this.props.data.datesAndPlacesProgress >= 3) {

      if (this.props.data.preferencesChecked) {
        preferencesBody = (
          <span>
            <h4 className="ui horizontal divider header">Flight Preferences</h4>
              <Link className="ui button basic fluid small" to="/dates-and-places/4">Change</Link>
          </span>
        );
      } else {
        preferencesBody = (<span>
          <h4 className="ui horizontal divider header">Flight Preferences</h4>
            <Link className="ui button fluid small secondary" to="/dates-and-places/4">Set Flight Preferences</Link>
        </span>
        )
      }
    }

    return <div className="five wide column">
      {preferencesBody}
    </div>

  }

  render() {

    let elToShow, anim = true;

      const subPage = parseInt(this.props.params.subPage);
        switch (subPage) {
          case 1:
            elToShow = <SetLocation data={this.props.data}
              updateVar={this.props.updateVar}
              key='pickLocation'
              defaultDepartingFrom={defaultDepartingFrom}
              defaultDepartingTo={defaultDepartingTo}
              onClose={
                function() {
                if (!this.props.data.departingFrom) { this.props.updateVar({departingFrom : defaultDepartingFrom }) }
                if (!this.props.data.departingTo){ this.props.updateVar({departingTo : defaultDepartingTo }) }
                if (this.props.data.datesAndPlacesProgress === 0) { this.props.updateVar({datesAndPlacesProgress : 1}) }
              }.bind(this)
              }
              />
            break;
          case 2:
            elToShow = <SetDate
              data={this.props.data}
              updateVar={this.props.updateVar}
              key='departDate'
              stateVal='departDate'
              onClose={
                function() {
                if (this.props.data.datesAndPlacesProgress === 1) {
                  this.props.updateVar({datesAndPlacesProgress: 2})
                }}.bind(this)
              }
              />
            break;
          case 3:
            elToShow = <SetDate
              data={this.props.data}
              key='returnDate'
              updateVar={this.props.updateVar}
              stateVal='returnDate'
              onClose={
                function() {
                if (this.props.data.datesAndPlacesProgress === 2) {
                  this.props.updateVar({datesAndPlacesProgress: 3})
                }}.bind(this)
              }
              />
            break;
          case 4:
            elToShow = <Preferences
              data={this.props.data}
              key='preferences'
              updateVar={this.props.updateVar}
              onClose={
                function() {
                if (this.props.data.datesAndPlacesProgress === 3) {
                  this.props.updateVar({datesAndPlacesProgress: 4})
                }}.bind(this)
              }
              />
            break;
          default:
            anim = false;
            elToShow = (
              <div className="ui grid centered stackable " key='locationParent'>
                {this.renderLocationBlock()}
                {this.renderDepartingBlock()}
                {this.renderReturningBlock()}
                {this.renderPreferencesBlock()}
              </div>
            )
        }

      elToShow = (
        <VelocityTransitionGroup enter={{
          animation: 'transition.expandIn',
          duration: 200,
          delay: 100
        }} leave={{
          animation: 'transition.expandOut',
          duration: 200
        }} runOnMount>
            { elToShow }
        </VelocityTransitionGroup>
      )

    return (
      <div className="datesandplacespage-component">
      { elToShow }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesAndPlacesPageComponent)
