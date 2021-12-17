import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useDragging } from '../../../hooks/useDragging';
import './Modal.css';

const Modal = ({
  type = 'modal',
  open,
  onClose,
  style = {},
  draggable = false,
  targetRef,
  children,
}) => {
  const [isElInserted, setIsElInserted] = useState(false);
  const modalRef = useRef(null);
  const childWrapperRef = useRef(null);
  const { parentElRef, dragElRef, setIsElReady } = useDragging();

  useEffect(() => {
    if (open && !modalRef.current) {
      modalRef.current = document.createElement('div');
      if (type === 'dropdown') {
        modalRef.current.classList.add('container');
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (!isElInserted && draggable) {
      dragElRef.current = null;
      setIsElReady(false);
      return;
    }

    if (draggable && !dragElRef.current) {
      dragElRef.current = document.getElementById('drag');
      setIsElReady(true);
    }

    if (isElInserted && childWrapperRef.current && targetRef.current) {
      const { left, top, height } = targetRef.current.getBoundingClientRect();
      childWrapperRef.current.style.left = left + 'px';
      childWrapperRef.current.style.top = top + height + 10 + 'px';

      if (draggable) {
        parentElRef.current = childWrapperRef.current;
      }
    }
  }, [isElInserted]);

  const onModalCloseHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggable) {
      setIsElReady(false);
    }
    onClose();
  };

  let contents;
  if (type === 'dropdown') {
    if (draggable) {
      contents = (
        <>
          <div className="overlay" onClick={onModalCloseHandler}></div>
          <div ref={childWrapperRef} className="dropdown-body enter">
            <div id="drag" className="drag">
              Grab Here
            </div>
            {children}
          </div>
        </>
      );
    } else {
      contents = (
        <>
          <div className="overlay" onClick={onModalCloseHandler}></div>
          <div ref={childWrapperRef} className="dropdown-body enter">
            {children}
          </div>
        </>
      );
    }
  } else {
    contents = (
      <>
        <div className="overlay" onClick={onModalCloseHandler}></div>
        <div className="modal-body enter" style={style}>
          {children}
        </div>
      </>
    );
  }

  if (open && modalRef.current && isElInserted) {
    return ReactDOM.createPortal(<>{contents}</>, modalRef.current);
  }
  return null;
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Modal;
