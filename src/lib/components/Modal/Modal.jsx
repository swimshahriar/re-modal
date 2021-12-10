import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ open, onClose, style = {}, children }) => {
  const [isElInserted, setIsElInserted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (open && !modalRef.current) {
      modalRef.current = document.createElement('div');
      modalRef.current.classList.add('modal');
      document.body.append(modalRef.current);
      setIsElInserted(true);
    }

    return () => {
      modalRef.current?.remove();
      modalRef.current = null;
      setIsElInserted(false);
    };
  }, [open]);

  const onModalCloseHandler = () => {
    onClose();
  };

  if (open && modalRef.current && isElInserted) {
    return ReactDOM.createPortal(
      <>
        <div className="overlay" onClick={onModalCloseHandler}></div>
        <div className="modal-body enter" style={style}>
          {children}
        </div>
      </>,
      modalRef.current
    );
  }
  return null;
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Modal;
