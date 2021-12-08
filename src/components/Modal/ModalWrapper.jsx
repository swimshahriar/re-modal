import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = ({ children }) => {
  useEffect(() => {
    return () => document.getElementById('modal').remove();
  });
  return ReactDOM.createPortal(children, document.getElementById('modal'));
};

export default ModalWrapper;
