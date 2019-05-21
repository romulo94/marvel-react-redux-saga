import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Content from './components/Content';
import { Creators as ModalActions } from '../../store/ducks/modal';

import './styles.css';

Modal.setAppElement(document.getElementById('root'));
PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]);
class ModalItem extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      open: PropTypes.bool,
      id: PropTypes.number,
    }).isRequired,
    hideModal: PropTypes.func.isRequired,
    comics: PropTypes.shape({}).isRequired,
  };

  handleHideModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  render() {
    const { modal, comics } = this.props;
    const element = comics.data.find(el => el.id === modal.id);
    return (
      <Modal
        isOpen={modal.open}
        onRequestClose={this.handleHideModal}
        contentLabel="Add User Modal"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        {element ? <Content element={element} /> : null}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  comics: state.comics,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ModalActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalItem);
