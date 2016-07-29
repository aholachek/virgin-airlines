'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import { updateVariable } from 'actions/index';



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

class CustomizePageComponent extends React.Component {

  componentDidMount () {
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

  renderPowerTripButton(){
    if (!this.props.data.powerTrip){
      return <button className="ui bottom attached secondary basic button"
        onClick={ function(){this.props.updateVar({ powerTrip  : !this.props.data.powerTrip})}.bind(this) }
        >
        <i className="add icon"></i>
        add this package
      </button>
    } else {
      return (<button className="ui bottom attached secondary button"
        onClick={ function(){this.props.updateVar({ powerTrip  : !this.props.data.powerTrip})}.bind(this) }
        >
        <i className="checkmark icon"></i>
        package added!
      </button>)
    }
  }

  renderPlansChangePackage(){
    if (!this.props.data.plansChangePackage){
      return <button className="ui bottom attached secondary basic button"
        onClick={function(){this.props.updateVar({ plansChangePackage  : !this.props.data.plansChangePackage})}.bind(this)}
        >
        <i className="add icon"></i>
        add this package
      </button>
    }
    else {
      return <button className="ui bottom attached secondary button"
        onClick={function(){this.props.updateVar({ plansChangePackage  : !this.props.data.plansChangePackage})}.bind(this)}
        >
        <i className="checkmark icon"></i>
        package added!
      </button>
    }

  }

  render() {
    return (
      <div className="customizepage-component ui grid">
          <div className="sixteen wide column" style={{'paddingBottom' : 0}}>
            <h4 className="ui horizontal divider header">
              <i className="icon suitcase bag-icon" ></i> Add Checked Bags
              </h4>
            </div>
          <div className="eight wide column">
            <label htmlFor="depart-bags">Departing</label>
            <select name="" id="depart-bags">
              <option value="0">0 bags</option>
              <option value="1">1 bags</option>
              <option value="2">2 bags</option>
              <option value="3">3 bags</option>
              <option value="4">4 bags</option>
            </select>
          </div>
          <div className="eight wide column">
            <label htmlFor="return-bags">Returning</label>
            <select name="" id="return-bags">
              <option value="0">0 bags</option>
              <option value="1">1 bags</option>
              <option value="2">2 bags</option>
              <option value="3">3 bags</option>
              <option value="4">4 bags</option>
            </select>
        </div>
        <div className="sixteen wide column" style={{'paddingBottom' : 0}}>
          <h4 className="ui horizontal divider header">
            <i className="icon diamond bag-icon" ></i> Enhance Your Experience
            </h4>
            <div className="ui cards centered" style={{maxHeight: '60vh', overflow : 'auto'}}>
                <div className={this.props.data.powerTrip ? "card chosen" : "card"}>
                  <div className="content">
                    <div className="header">
                    Power Trip Package
                    </div>
                    <div className="meta">
                      $79 each way
                    </div>
                    <div className="description">
                      <ul>
                        <li>Preferred seat selection</li>
                        <li>Priority seating & boarding</li>
                        <li>One free checked bag</li>
                      </ul>
                    </div>
                  </div>
                  {this.renderPowerTripButton()}
                </div>
                <div className={ this.props.data.plansChangePackage ? "card chosen" : "card" }>
                  <div className="content">
                    <div className="header">
                    Plans Change Package
                    </div>
                    <div className="meta">
                      $25 per guest
                    </div>
                    <div className="description">
                      <p>
                        Make unlimited flight changes and skip the $150 fee.
                      </p>
                    </div>
                  </div>
                  {
                    this.renderPlansChangePackage()
                  }
                </div>
              </div>
          </div>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CustomizePageComponent)
