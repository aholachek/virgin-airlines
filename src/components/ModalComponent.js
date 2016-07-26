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
          top: 'calc(50vh - 38px)'
        }}
        backdropStyle={{
          backgroundColor: 'transparent'
        }}
        >
        <div style={{padding: '50px'}}>
          { this.props.children }
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
