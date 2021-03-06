'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {updateVariable, generateFlights} from 'actions/index';

import _ from 'lodash'

import FlightList from './FlightListComponent'

const mapStateToProps = (state, ownProps) => {
  return {data: state}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateVar: (data) => {
      dispatch(updateVariable(data))
    },
    generateFlights: (data) => {
      dispatch(generateFlights())
    }
  }
}

class FlightListPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'departing'
    }
  }

  componentDidMount() {

    //set flights if they do not already exist
    if (!_.keys(this.props.data.flights).length) {
      this.props.generateFlights();
    }
  }

  render() {
    return (
      <div className="flightlistpage-component">
        <div className="ui pointing secondary menu">
          <a className={this.state.tab === 'departing'
            ? 'active item':'item'}
            onClick={function(){this.setState({tab : 'departing'})}.bind(this)}>
            <i className="plane icon"></i>
             Pick Departing</a>
          <a className={this.state.tab === 'returning'
            ? 'active item'
            : 'item'}
            onClick={function(){this.setState({tab : 'returning'})}.bind(this)}
            >
            <i className="plane icon"></i>
            Pick Returning</a>
        </div>
        <div>
          <div className="ui buttons compact" style={{marginBottom: '10px'}}>
            <button className="ui button basic toggle"><i className="icon sort"></i> duration</button>
            <button className="ui button toggle "><i className="icon sort"></i>  date</button>
            <button className="ui button basic toggle"><i className="icon sort"></i> price</button>
          </div>
        </div>
        { (this.state.tab === 'departing')?
          <FlightList
            flights={this.props.data.flights.departing}
            title="departing"
            chosen={this.props.data.departingFlight}
            updateVar={this.props.updateVar}
            />
           :
          <FlightList
            flights={this.props.data.flights.returning}
            title="returning"
            chosen={this.props.data.returningFlight}
            updateVar={this.props.updateVar}
            />
        }

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightListPageComponent);
