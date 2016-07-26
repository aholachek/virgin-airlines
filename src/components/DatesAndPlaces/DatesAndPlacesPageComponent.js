'use strict';

import React from 'react'
import {connect} from 'react-redux'
import {updateVariable} from 'actions/index'

import Modal from './ModalComponent'

const mapStateToProps = (state, ownProps) => {
  return {state: state}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateVar: (data) => {
      dispatch(updateVariable(data))
    }
  }
}


class DatesAndPlacesPageComponent extends React.Component {

  showModal (){
        this.refs.modal.refs.modal.show()
    }

    hideModal (){
        this.refs.modal.refs.modal.hide();
    }

  render() {
    return (
      <div className="datesandplacespage-component">
        <div className="ui grid centered stacked">
          <div class="five wide column">
            Round Trip
          </div>
          <div class="five wide column">

          </div>
          <div class="five wide column">

          </div>
        </div>
            <button className="ui button" onClick={this.showModal.bind(this)}>Open</button>
              <Modal ref="modal">
                <h2>I am a dialog</h2>
                <button className="ui button" onClick={this.hideModal.bind(this)}>Close</button>
              </Modal>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DatesAndPlacesPageComponent)
