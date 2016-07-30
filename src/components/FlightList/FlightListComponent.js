'use strict';

import React from 'react';
import _ from 'lodash'
import { withRouter } from 'react-router'

class FlightListComponent extends React.Component {

  createButtonRow(fl){
    //where varname is departing or returning

    const onClick = function(cl, id){
      this.props.updateVar({
        [this.props.title + 'Flight'] : {id : id, class : cl}
      });
      //hack to move to the next page automatically
      if (this.props.title === 'returning'){
        this.props.router.push('/customize');
      }
    }.bind(this);

    const buttons = Object.keys(fl.classes).map(function(k){

      let className;
      if (this.props.chosen && fl.id  === this.props.chosen.id && this.props.chosen.class === k){
        className = "ui button secondary";
      }
      else {
        className = "ui button secondary basic";
      }
        return (
          <button className={className} onClick={_.partial(onClick, k, fl.id)}>
            Main<br/>
          <b>${fl.classes[k]}</b>
          </button>
        )

    }, this);

      return <div className="ui buttons tiny class-buttons" style={{
        width: '100%'
      }}> {buttons}
    </div>
  }

  renderFlightCards() {
    if (!this.props.flights) return ''
    const cards = this.props.flights.map(function(fl, ind) {
      let className = "card flight-card";
      if (this.props.chosen && fl.id  === this.props.chosen.id) className += " chosen"
      return (
        <div className={className }>
          <div className="content" style={{padding: '.5em'}}>
            <b style={{
              position: 'relative',
              top: '8px'
            }}>
              { ind + 1 }. {fl.leg1.departTime.format('ddd, D MMM')}</b>
            <span className="pull-right">
              <b>{ fl.totalTime } hrs total</b><br/>
              { fl.layoverTime } hr layover</span>
          </div>
          <div className="content">
            <div className="ui grid">
              <div className="eight wide column">
                <h4 className="flight-sub-header">
                  <span className="ui sub header">LEG 1</span>
                  <span className="meta" style={{
                    fontSize: '1rem'
                  }}>
                  &nbsp;&nbsp;Fl. { fl.leg1.number }</span>
                </h4>
                <div className="header flight-header">
                  {fl.leg1.departPlace.match(/\((.*)\)/, '')[1]}&nbsp;
                  <i className="icon long arrow right"></i>&nbsp;
                  {fl.leg1.arrivePlace.match(/\((.*)\)/, '')[1]}
                </div>
                <div className="description">
                  { fl.leg1.departTime.format('h:mma') + ' - ' + fl.leg1.arriveTime.format('h:mma') }
                </div>

              </div>
              <div className="eight wide column">
                <h4 className="flight-sub-header">
                  <span className="ui sub header">LEG 2</span>
                  <span className="meta" style={{
                    fontSize: '1rem'
                  }}>
                    &nbsp;&nbsp;Fl. {fl.leg2.number }</span>
                </h4>
                <div className="header flight-header">
                  <div className="header flight-header">
                    {fl.leg2.departPlace.match(/\((.*)\)/, '')[1]}&nbsp;
                    <i className="icon long arrow right"></i>&nbsp;
                    {fl.leg2.arrivePlace.match(/\((.*)\)/, '')[1]}
                  </div>
                </div>
                <div className="description">
                  { fl.leg2.departTime .format('h:mma') + ' - ' + fl.leg2.arriveTime.format('h:mma') }
                </div>
              </div>
            </div>

          </div>
          <div className="extra content">
            <b>Choose flight:</b>
              {this.createButtonRow(fl)}

          </div>
        </div>
      )
    }, this);

    return <div className="ui cards flight-cards centered">{cards}</div>

  }
  render() {
    return (
      <div className="">
        {this.renderFlightCards()}
      </div>
    )

  }
}

export default withRouter(FlightListComponent);
