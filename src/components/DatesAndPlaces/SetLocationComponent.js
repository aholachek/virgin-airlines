'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

const Flights = [
  'Austin, TX (AUS)',
  'Boston, MA (BOS)',
  'Cancun, Mexico (CUN)',
  'Chicago, IL (ORD)',
  'Denver, CO (DEN)',
  'Honolulu, HI (HNL)',
  'Las Vegas, NV (LAS)',
  'Los Angelas, CA (LAX)',
  'New York/Kennedy, NY (JFK)',
  'New York/La Guardia, NY (LGA)',
  'San Fransisco, CA (SFO)',
  'Seattle, WA (SEA)',
  'Washington DC, WAS (WAS)'
];

class SetLocationComponent extends React.Component {

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

  renderFrom() {
    return (
      <div>
        <label>From</label>
        <select value={this.props.data.departingFrom ? this.props.data.departingFrom  : this.props.defaultDepartingFrom }
          name="" id="" onChange={function() {
          this.props.updateVar({'departingFrom' : arguments[0].target.value})
        }.bind(this)}>
          {Flights.map(function(f) {
            return <option value={f}>{f}</option>
          })
}
        </select>
      </div>
    )

  }

  renderTo() {
    return (
      <div>
        <label>To</label>
        <select value={this.props.data.departingTo ? this.props.data.departingTo : this.props.defaultDepartingTo  }
          name="" id="" onChange={function(e) {
          this.props.updateVar({'departingTo' : arguments[0].target.value})
        }.bind(this)}>
          {Flights.map(function(f) {
            return <option value={f}>{f}</option>
          })
}
        </select>
      </div>
    )
  }

  render() {

    //create flight type buttons

    return (
      <div className="ui grid stacked centered initial-flight-form">
        <div className="sixteen wide column">
          <h2 style={{margin: '0'}}>Where would you like to go?</h2>
          <br/>
        </div>
        <div className="form">
          <div className="sixteen wide column">
            <div className="ui three buttons small">
              {
                ['One Way', 'Round Trip', 'Multi'].map(function(b){

                  let className = "ui button basic";
                  if (b === 'Round Trip'){
                    className+=" secondary small-padding"
                  }
                  if (b === 'Round Trip'){
                    b = <span><i className="icon checkmark small"></i>{b}</span>
                  }
                  return <button className={className}>{b}</button>
                }, this)
              }
            </div>
          </div>
          <div className="eight wide column">
            <div className="field">
              {this.renderFrom()}
            </div>
          </div>
          <div className="eight wide column">
            <div className="field">
              {this.renderTo()}
            </div>
          </div>
          <div className="sixteen wide column" style={{paddingTop: '20px'}}>
            <Link to="/dates-and-places" className="ui button primary fluid"
              onClick={ this.props.onClose }
              >
              <i className="icon plane large"></i> Let's Go!
              </Link>
          </div>
        </div>
      </div>
    )

  }

}

export default SetLocationComponent;
