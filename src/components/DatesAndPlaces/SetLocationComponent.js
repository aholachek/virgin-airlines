'use strict';

import React from 'react';

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
  'San Fransisco, CA (SFO)'
  'Seattle, WA (SEA)',
  'Washington DC, WAS (WAS)'
];

class SetLocationComponent extends React.Component {
  render() {

    //create from dropdown

    // create to dropdown
    return (
      <div className="ui grid stacked centered">
        <div className="five wide column">
          <div className="field">
            <label>From</label>
            <div className="ui selection dropdown">
              <input type="hidden" name="gender">
                <i className="dropdown icon"></i>
                <div className="default text">Gender</div>
                <div className="menu">
                  <div className="item" data-value="1">Male</div>
                  <div className="item" data-value="0">Female</div>
                </div>
              </div>
            </div>
          </div>
          <div className="five wide column">
            <div className="field">
              <label>To</label>
              <div className="ui selection dropdown">
                <input type="hidden" name="gender">
                  <i className="dropdown icon"></i>
                  <div className="default text">Gender</div>
                  <div className="menu">
                    <div className="item" data-value="1">Male</div>
                    <div className="item" data-value="0">Female</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="five wide column">
              <div className="field">
                <label>Gender</label>
                <div className="ui selection dropdown">
                  <input type="hidden" name="gender">
                    <i className="dropdown icon"></i>
                    <div className="default text">Gender</div>
                    <div className="menu">
                      <div className="item" data-value="1">Male</div>
                      <div className="item" data-value="0">Female</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
