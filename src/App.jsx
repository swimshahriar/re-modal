import { useState, useCallback } from 'react';

// internal imports
import './App.css';
import Modal from './components/Modal/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenHandler = () => {
    setIsModalOpen(true);
  };

  const onCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <button className="btn" onClick={onOpenHandler}>
        Open Modal
      </button>

      <Modal open={isModalOpen} onClose={onCloseHandler}>
        <h2>Hello</h2>
      </Modal>
    </div>
  );
}

export default App;
