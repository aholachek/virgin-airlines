'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {updateVariable} from 'actions/index'

import Modal from './../ModalComponent'

import SetLocation from './SetLocationComponent'
import SetDate from './SetDateComponent'

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

class DatesAndPlacesPageComponent extends React.Component {

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

  render() {
    return (
      <div className="datesandplacespage-component">
        <div className="ui grid centered stackable ">
          <div className="five wide column">

            <h2>Cities</h2>
            <span>
              {this.props.data.departingFrom
                ? (
                  <span>
                    <p>{this.props.data.tripType}</p>
                    <p>
                      <b>{this.props.data.departingFrom.replace(/\(.*\)/, '')}</b>&nbsp;to&nbsp;
                      <b>{this.props.data.returningTo.replace(/\(.*\)/, '')}</b>
                    </p>
                  </span>
                )
                : ''
            }
            </span>

            <button className="ui button" onClick={this.showModal.bind(this, 'location-modal')}>Change</button>
          </div>
          <div className="five wide column">
            {this.props.departDate
              ? (
                <span>
                  <h2>Departing on</h2>
                  <p>{this.props.departDate}</p>
                    <button className="ui button" onClick={this.showModal.bind(this, 'departing-modal')}>Change</button>
                </span>
              )
              : <button className="ui button" onClick={this.showModal.bind(this, 'departing-modal')}>Pick a Departure Date</button>
          }
          </div>
          <div className="five wide column">
            {this.props.returnDate
              ? (
                <span>
                  <h2>Returning on</h2>
                  <p>{this.props.returnDate}</p>
                    <button className="ui button" onClick={this.showModal.bind(this, 'returning-modal')}>Change</button>

                </span>
              )
              : <button className="ui button" onClick={this.showModal.bind(this, 'returning-modal')}>Pick a Return Date</button>
          }

          </div>
        </div>
        <Modal ref="location-modal">
          <SetLocation updateVar={this.props.updateVar} data={this.props.data}/>
        </Modal>
        <Modal ref="departing-modal">
          <SetDate updateVar={this.props.updateVar} direction="Departing" data={this.props.data}/>
        </Modal>
        <Modal ref="returning-modal">
          <SetDate updateVar={this.props.updateVar} direction="Returning" data={this.props.data}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesAndPlacesPageComponent)
