import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ open, onClose, children }) => {
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
    // const modalEl = document.querySelector('.modal');
    // modalEl.classList.remove('enter');
    // modalEl.classList.add('exit');

    onClose();
  };

  if (open && modalRef.current && isElInserted) {
    return ReactDOM.createPortal(
      <>
        <div className="overlay" onClick={onModalCloseHandler}></div>
        <div className="modal-body enter">{children}</div>
      </>,
      modalRef.current
    );
  }
  return null;
};

export default Modal;
