import { useState } from 'react';

// internal imports
import './App.css';
import Modal from './lib/components/Modal/Modal';
import Test from './components/Test/Test';

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

      <Modal
        open={isModalOpen}
        onClose={onCloseHandler}
        style={{ background: '#000', color: '#fff' }}
      >
        <h2>Hello</h2>
        <Test />
      </Modal>
    </div>
  );
}

export default App;
