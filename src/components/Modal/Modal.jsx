import ModalWrapper from './ModalWrapper';
import './Modal.css';

const Modal = ({ setIsModalOpen }) => {
  return (
    <ModalWrapper>
      <div className="modal">
        <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
