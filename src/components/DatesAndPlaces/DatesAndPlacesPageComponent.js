'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {updateVariable} from 'actions/index'

import Modal from './../ModalComponent'

import SetLocation from './SetLocationComponent'
import SetDate from './SetDateComponent'
import Preferences from './../Preferences/PreferencesPageComponent'

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

  componentDidMount() {
    if (!this.props.data.departingFrom || !this.props.data.departingTo) {
      this.showModal('location-modal')
    }
  }

  showModal(modalName) {
    this.refs[modalName].refs.modal.show()
  }

  hideModal(modalName) {
    this.refs[modalName].refs.modal.hide();
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
                <button className="ui button basic fluid small" onClick={this.showModal.bind(this, 'location-modal')}>Change</button>
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
            <p>{this.props.data.departDate.toDateString()}</p>
            <button className="ui button basic fluid small" onClick={this.showModal.bind(this, 'departing-modal')}>
              Change
            </button>
          </span>
        )
      } else {
        departingBody = (
          <span>
            <h4 className="ui horizontal divider header">Departing on</h4>
            <button className="ui button fluid small secondary" onClick={this.showModal.bind(this, 'departing-modal')}>
              Pick a Departure Date
            </button>
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
            <p>{this.props.data.returnDate.toDateString()}</p>
            <button className="ui button basic fluid small" onClick={this.showModal.bind(this, 'returning-modal')}>
              Change
            </button>
          </span>
        )
      } else {
        returningBody = (
          <span>
            <h4 className="ui horizontal divider header">Returning on</h4>
            <button className="ui button fluid small secondary" onClick={this.showModal.bind(this, 'returning-modal')}>
              Pick a return Date
            </button>
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
            <button className="ui button basic fluid small" onClick={this.showModal.bind(this, 'preferences-modal')}>
              Change
            </button>

          </span>
        );
      } else {
        preferencesBody = (<span>
          <h4 className="ui horizontal divider header">Flight Preferences</h4>
          <button className="ui button fluid small secondary" onClick={this.showModal.bind(this, 'preferences-modal')}>
            Set Flight Preferences
          </button>
        </span>
        )
      }
    }

    return <div className="five wide column">
      {preferencesBody}
    </div>

  }

  render() {
    return (
      <div className="datesandplacespage-component">
        <div className="ui grid centered stackable ">

          {this.renderLocationBlock()}
          {this.renderDepartingBlock()}
          {this.renderReturningBlock()}
          {this.renderPreferencesBlock()}

        </div>
        <Modal ref="location-modal" onClose={
            function() { //set in the defaults if necessary
            if (!this.props.data.departingFrom) { this.props.updateVar({departingFrom : defaultDepartingFrom }) }
            if (!this.props.data.departingTo){ this.props.updateVar({departingTo : defaultDepartingTo }) }
            if (this.props.data.datesAndPlacesProgress ===0) { this.props.updateVar({datesAndPlacesProgress : 1}) } }.bind(this)
            }
            closeButton={true}>
          <SetLocation updateVar={this.props.updateVar} data={this.props.data} defaultDepartingFrom={defaultDepartingFrom} defaultDepartingTo={defaultDepartingTo}/>
        </Modal>
        <Modal ref="departing-modal">
          <SetDate updateVar={this.props.updateVar} title="Departing"
            stateVal='departDate'
            data={this.props.data}
            closeModal={function() {
            this.hideModal('departing-modal');
            if (this.props.data.datesAndPlacesProgress === 1) {
              this.props.updateVar({datesAndPlacesProgress: 2})
            }
          }.bind(this)}/>
        </Modal>
        <Modal ref="returning-modal">
          <SetDate updateVar={this.props.updateVar} title="Returning" stateVal='returnDate' data={this.props.data} closeModal={function() {
            this.hideModal('returning-modal');
            if (this.props.data.datesAndPlacesProgress === 2) {
              this.props.updateVar({datesAndPlacesProgress: 3})
            }
          }.bind(this)}/>
        </Modal>
        <Modal ref="preferences-modal">
          <Preferences updateVar={this.props.updateVar} data={this.props.data} closeModal={function() {
            this.hideModal('preferences-modal');
            if (this.props.data.datesAndPlacesProgress === 3) {
              this.props.updateVar({datesAndPlacesProgress: 4})
            }
          }.bind(this)}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesAndPlacesPageComponent)
