import { useState } from 'react';

// internal imports
import './App.css';
import Modal from './lib/components/Modal/Modal';
import Test from './lib/components/Test/Test';

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
        <Test />
      </Modal>
    </div>
  );
}

export default App;
