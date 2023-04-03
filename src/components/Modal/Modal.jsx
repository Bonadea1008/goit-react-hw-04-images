import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

export const Modal = ({ closeModal, modalAlt, modalImage }) => {
  const closeEscModal = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeEscModal);
    return () => {
      window.removeEventListener('keydown', closeEscModal);
    };
  });

  return (
    <>
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modal}>
          <img src={modalImage} alt={modalAlt} />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  handleBackDropClick: PropTypes.func,
};
