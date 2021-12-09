import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ open, onClose, children }) => {
  const [isElInserted, setIsElInserted] = useState(false);
  const modalRef = useRef(document.getElementById('modal'));

  useEffect(() => {
    if (open && !modalRef.current) {
      modalRef.current = document.createElement('div');
      modalRef.current.setAttribute('id', 'modal');
      document.body.prepend(modalRef.current);
      setIsElInserted(true);
    }

    return () => {
      modalRef.current?.remove();
    };
  }, [open]);

  const onModalCloseHandler = () => {
    const modalEl = document.querySelector('.modal');
    modalEl.classList.remove('enter');
    modalEl.classList.add('exit');

    setTimeout(() => {
      modalRef.current?.remove();
      modalRef.current = null;
      onClose();
      setIsElInserted(false);
    }, 300);
  };

  if (open && modalRef.current && isElInserted) {
    return ReactDOM.createPortal(
      <>
        <div className="overlay" onClick={onModalCloseHandler}></div>
        <div className="modal enter">
          <button className="btn-close" onClick={onModalCloseHandler}>
            Close
          </button>
          {children}
        </div>
      </>,
      modalRef.current
    );
  }
  return null;
};

export default Modal;
