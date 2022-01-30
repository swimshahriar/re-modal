import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

export const useDragging = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isElReady, setIsElReady] = useState(false);

  const dragPosRef = useRef({ x: 0, y: 0 });
  const dragElRef = useRef(null);
  const parentElRef = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.stopPropagation();
      e.preventDefault();

      if (parentElRef.current) {
        const { x, y } = dragPosRef.current;
        parentElRef.current.style.left = `${
          parentElRef.current.offsetLeft - (x - e.x)
        }px`;
        parentElRef.current.style.top = `${
          parentElRef.current.offsetTop - (y - e.y)
        }px`;

        dragPosRef.current = { x: e.x, y: e.y };
      }
    },
    [isDragging]
  );

  const onMouseUp = (e) => {
    setIsDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    e.stopPropagation();
    e.preventDefault();

    dragPosRef.current = { x: e.x, y: e.y };
  };

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    if (isElReady) {
      dragElRef.current.addEventListener('mousedown', onMouseDown);
    }
  }, [isElReady]);

  // Everytime the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging, onMouseMove]);

  return { dragElRef, parentElRef, setIsElReady, isDragging };
};

const Modal = ({
  type = 'modal',
  open,
  onClose,
  style = {},
  dragAreaStyle = {},
  draggable = false,
  targetRef,
  isOverlay = false,
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

  const overlayStyle = {
    backgroundColor: isOverlay ? 'rgb(0, 0, 0, 0.05)' : 'transparent',
  };

  let contents;
  if (type === 'dropdown') {
    if (draggable) {
      contents = (
        <>
          <div
            className="overlay"
            style={overlayStyle}
            onClick={onModalCloseHandler}
          ></div>
          <div
            ref={childWrapperRef}
            className="dropdown-body enter"
            style={style}
          >
            <div id="drag" className="drag" style={dragAreaStyle}>
              Grab Here
            </div>
            {children}
          </div>
        </>
      );
    } else {
      contents = (
        <>
          <div
            className="overlay"
            style={overlayStyle}
            onClick={onModalCloseHandler}
          ></div>
          <div
            ref={childWrapperRef}
            className="dropdown-body enter"
            style={style}
          >
            {children}
          </div>
        </>
      );
    }
  } else {
    contents = (
      <>
        <div
          className="overlay"
          style={overlayStyle}
          onClick={onModalCloseHandler}
        ></div>
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
  dragAreaStyle: PropTypes.object,
  type: PropTypes.string,
  draggable: PropTypes.bool,
  isOverlay: PropTypes.bool,
  targetRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    null,
  ]),
};

export default Modal;
