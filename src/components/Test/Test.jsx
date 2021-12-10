import React, { useState } from 'react';
import Modal from '../../lib/components/Modal/Modal';

function Test() {
  const [isChildOpen, setIsChildOpen] = useState(false);
  function handleChildClose() {
    setIsChildOpen(false);
  }
  return (
    <div>
      <button onClick={() => setIsChildOpen(true)}>Open Child</button>
      <Modal open={isChildOpen} onClose={handleChildClose}>
        <h2>Hello Child</h2>
        <button onClick={() => setIsChildOpen(false)}>Close Child</button>
      </Modal>
    </div>
  );
}

export default Test;
