### Features

- Supports Nested modal ✅

### Installation

```zsh
npm i @swimshahriar/re-modal
# or
yarn add @swimshahriar/re-modal
```

### Examples

```jsx
import { useState } from 'react';
import Modal from '@swimshahriar/re-modal'; // default import

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
      // takes two props open state and onClose function
      <Modal open={isModalOpen} onClose={onCloseHandler}>
        // pass anything here
        <h2>Hello</h2>
      </Modal>
    </div>
  );
}
```
