'use strict';

import React from 'react';
import Modal from './BoronOverride'


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
         'transform':'translate(-50%, -50%)'

       }}
        backdropStyle={{
          backgroundColor: 'transparent'
        }}
        >
        <div className="modal-inner">
          { this.props.children }
          {this.props.closeButton ?
            <button className="fluid ui button modal-close primary"
               onClick={function(){
                this.props.onClose();
                this.refs.modal.hide();
              }.bind(this)}>
            {this.props.buttonText || 'Continue'}
            </button>
            : ''
          }

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
