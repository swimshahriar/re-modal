import ModalWrapper from './ModalWrapper';
import './Modal.css';

const Modal = ({ setIsModalOpen }) => {
  const onModalCloseHandler = () => {
    const modalEl = document.querySelector('.modal');
    modalEl.classList.remove('enter');
    modalEl.classList.add('exit');

    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <ModalWrapper>
      <div className="modal enter">
        <button onClick={onModalCloseHandler}>Close Modal</button>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
