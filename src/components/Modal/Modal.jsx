import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, StyledModal } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
  }

  closeOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeOnBackdropClick = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  };

  render() {
    const { image, altText } = this.props;
    return createPortal(
      <Overlay onClick={this.closeOnBackdropClick}>
        <StyledModal>
          <img src={image} alt={altText} />
        </StyledModal>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
