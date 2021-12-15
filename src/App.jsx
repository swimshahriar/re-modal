import { useState, useRef } from 'react';

// internal imports
import './App.css';
import Modal from './lib/components/Modal/Modal';
// import Test from './components/Test/Test';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickRef = useRef({
    left: 0,
    top: 0,
  });

  const onOpenHandler = (e) => {
    const { offsetLeft, offsetTop, offsetHeight } = e.target;
    // console.log({ offsetLeft, offsetTop, offsetHeight });
    clickRef.current = {
      left: offsetLeft,
      top: offsetTop + offsetHeight + 10,
    };
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
        // style={{ background: '#000', color: '#fff' }}
        draggable
        clickRef={clickRef.current}
      >
        <h2>Hello</h2>
        {/* <Test /> */}
      </Modal>
    </div>
  );
}

export default App;
