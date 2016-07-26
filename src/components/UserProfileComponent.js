'use strict';

import React from 'react';
import { connect } from 'react-redux'

import Chart from './HorizontalChartComponent';

const mapStateToProps = (state, ownProps) => {
  return {user : state.currentUser}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {}
  }
}


class UserProfileComponent extends React.Component {
  render() {

    let data = [
      {
        icon: 'heartbeat',
        bar2Width: '30%',
        description : 'Health',
        color: 'red'
      }, {
        icon: 'comment',
        bar2Width: '60%',
        description : 'Social Life',
        color: 'teal',

      }, {
        icon: 'suitcase',
        bar2Width: '90%',
        description : 'Career',
        color: 'green',
      }, {
        icon: 'book',
        bar2Width: '90%',
        description : 'Hobbies',
        color: 'blue'
      }

    ];

    debugger

    return (
      <div className="userprofile-component ui grid centered stackable">
        <div className="sixteen wide column">
          <h3>User Page for { this.props.user.name }</h3>
        </div>
        <div className="eight wide column">
          <div className="ui statistics tiny" style={{
            paddingTop : '35px'
          }}>
            <div className="statistic">
              <div className="value">
                22
              </div>
              <div className="label">
                Faves
              </div>
            </div>
            <div className="statistic">
              <div className="value">
                31,200
              </div>
              <div className="label">
                Views
              </div>
            </div>
            <div className="statistic">
              <div className="value">
                22
              </div>
              <div className="label">
                Members
              </div>
            </div>
          </div>
        </div>
        <div className="eight wide column">
          <Chart data={data}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent)
