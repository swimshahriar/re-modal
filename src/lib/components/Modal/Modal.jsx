import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useDragging } from '../../../hooks/useDragging';
import './Modal.css';

const Modal = ({
  open,
  onClose,
  style = {},
  draggable = false,
  clickRef = {
    left: 0,
    top: 0,
  },
  children,
}) => {
  const [isElInserted, setIsElInserted] = useState(false);
  const modalRef = useRef(null);
  const { parentElRef, dragElRef, setIsElReady } = useDragging();
  const { left, top } = clickRef;

  useEffect(() => {
    if (open && !modalRef.current) {
      modalRef.current = document.createElement('div');
      if (draggable) {
        modalRef.current.classList.add('container');
        modalRef.current.style.left = left + 'px';
        modalRef.current.style.top = top + 'px';
        parentElRef.current = modalRef.current;
      } else {
        modalRef.current.classList.add('modal');
      }
      document.body.append(modalRef.current);
      setIsElInserted(true);
    }

    return () => {
      modalRef.current?.remove();
      modalRef.current = null;
      setIsElInserted(false);
    };
  }, [open]);

  useEffect(() => {
    if (!isElInserted) {
      dragElRef.current = null;
      setIsElReady(false);
      return;
    }

    if (!dragElRef.current) {
      dragElRef.current = document.getElementById('drag');
      setIsElReady(true);
    }
  }, [isElInserted]);

  const onModalCloseHandler = () => {
    setIsElReady(false);
    onClose();
  };

  if (open && modalRef.current && isElInserted) {
    return ReactDOM.createPortal(
      <>
        {draggable ? (
          <>
            <div id="drag" className="drag">
              Grab Here
            </div>
            <button onClick={onModalCloseHandler}>Close</button>
            {children}
          </>
        ) : (
          <>
            <div className="overlay" onClick={onModalCloseHandler}></div>
            <div className="modal-body enter" style={style}>
              {children}
            </div>
          </>
        )}
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
