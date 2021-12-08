import { useState } from 'react';

// internal imports
import './App.css';
import Modal from './components/Modal/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpenHandler = () => {
    let modalEl = document.getElementById('modal');
    // if no modal wrapper, create one
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.setAttribute('id', 'modal');
      document.body.prepend(modalEl);
    }

    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <button className="btn" onClick={modalOpenHandler}>
        Open Modal
      </button>

      {/* --------------------- modal component ------------------- */}
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default App;
