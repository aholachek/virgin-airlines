'use strict';

import React from 'react';
import Modal from 'boron/WaveModal'


class ModalComponent extends React.Component {

  render() {
    return (
      <Modal
        ref="modal"
        keyboard
        backdrop
        modalStyle={{
          minHeight: '100vh',
          width: '110%',
          top: 'calc(50vh - 38px)',
          padding: '0',
       }}
        backdropStyle={{
          backgroundColor: 'transparent'
        }}
        >
        <div className="modal-inner">
          { this.props.children }
          <button className="fluid ui button modal-close" onClick={function(){this.refs.modal.hide()}.bind(this)}>
            <i className="icon check circle"></i>{this.props.buttonText || 'Close'}
          </button>
        </div>
      </Modal>
    );
  }
}

ModalComponent.displayName = 'ModalComponent';

// Uncomment properties you need
// ModalComponent.propTypes = {};
// ModalComponent.defaultProps = {};

export default ModalComponent;
