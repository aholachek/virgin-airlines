'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

import { updateVariable, generateFlights } from 'actions/index';
import {connect} from 'react-redux'

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


class PreferencesPageComponent extends React.Component {

  componentDidMount(){

    var that = this;

    function activateDropdown(){
    //HACK
      if (window.$ && window.$.fn && window.$.fn.dropdown ){
        $(ReactDOM.findDOMNode(that)).find('select').dropdown();
      }
      else {
        setTimeout(activateDropdown, 100)
      }
    }
    activateDropdown();
  }

  renderFlightTypeButtons () {

   const onClickTrue = function(){
     this.props.updateVar({
       mustBeDirect : true
     })
   }.bind(this);
   const onClickFalse = function(){
     this.props.updateVar({
       mustBeDirect : false
     })
   }.bind(this);

      if (!this.props.data.mustBeDirect){
        return (
          <div className="ui two buttons class-buttons">
            <button className="ui button secondary basic"><i className="icon checkmark"></i> All Flights</button>
            <button className="ui button basic" onClick={onClickTrue}> Only Direct Flights</button>
          </div>
        )
      }
      else {
        return (
          <div className="ui two buttons class-buttons">
            <button className="ui button basic" onClick={onClickFalse}>All Flights</button>
            <button className="ui button secondary basic"><i className="icon checkmark"></i>Only Direct Flights</button>
          </div>
        )
    }

  }

  renderTicketTypeButtons () {

   const onClickTrue = function(){
     this.props.updateVar({
       refundable : true
     })
   }.bind(this);
   const onClickFalse = function(){
     this.props.updateVar({
       refundable : false
     })
   }.bind(this);

      if (!this.props.data.refundable){
        return (
          <div className="ui two buttons class-buttons">
            <button className="ui button secondary basic"><i className="icon checkmark"></i> Best Fares</button>
            <button className="ui button basic" onClick={onClickTrue}> Refundable</button>
          </div>
        )
      }
      else {
        return (
          <div className="ui two buttons class-buttons">
            <button className="ui button basic" onClick={onClickFalse}> Best Fares</button>
            <button className="ui button secondary basic"><i className="icon checkmark"></i>Refundable</button>
          </div>
        )
    }

  }

  renderClassButtons () {

    const buttons = Object.keys(this.props.data.class).map(function(c){
      const val = this.props.data.class[c];
      let button;
      if (val === true) {
        button =  (<button className="ui button toggle"
        onClick={function(){this.props.updateVar({
          class : _.assign({}, this.props.data.class, { [c] : false})
        })}.bind(this)}
        >
            <i className="icon checkmark"></i>{c}
          </button>)
      }
      else {
        button =  (<button className="ui button toggle basic"
        onClick={function(){this.props.updateVar({
          class : _.assign({}, this.props.data.class, { [c] : true})
        })}.bind(this)}
        >
           {c}
        </button>)
      }
      return button
    }, this);

   return <div className="ui three buttons class-buttons">{buttons}</div>

  }


  render() {
    return (
      <div className="preferencespage-component">
          <div className="ui grid">
            <div className="row" style={{paddingTop : '4vh'}}>
              <div className="sixteen wide column">
                <h4 className="ui horizontal divider header" style={{marginTop : '0px !important'}}>How flexible are you on dates?</h4>
                </div>
              <div className="eight wide column">
                <label htmlFor="depart-flexibility">Departing</label>
                <select name="" id="depart-flexibility">
                  <option value="0">+-0 days</option>
                  <option value="1">+-1 days</option>
                  <option value="2">+-2 days</option>
                  <option value="3">+-3 days</option>
                  <option value="4">+-4 days</option>
                </select>
              </div>
              <div className="eight wide column">
                <label htmlFor="return-flexibility">Returning</label>
                <select name="" id="return-flexibility">
                  <option value="0">+-0 days</option>
                  <option value="1">+-1 days</option>
                  <option value="2">+-2 days</option>
                  <option value="3">+-3 days</option>
                  <option value="4">+-4 days</option>
                </select>
            </div>
              <div className="sixteen wide column">
                <h4 className="ui horizontal divider header">Preferred Flight Type?</h4>
                  {this.renderFlightTypeButtons()}
              </div>

              <div className="sixteen wide column">
              <h4 className="ui horizontal divider header">Ticket Type?</h4>
                  {this.renderTicketTypeButtons()}
              </div>
              <div className="sixteen wide column">
                  <Link to="flight-list"
                    className="ui button fluid primary"
                    style={{marginTop: '20px'}}

                    onClick={
                      function(){
                      this.props.updateVar({preferencesChecked : true })
                    }.bind(this)
                    }
                    >
                    <i className="icon search"></i> Search for Flights
                  </Link>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesPageComponent);
