### Features

- Supports Nested modal ✅
- Style object for styling 🖌

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

  const style = {
    background: '#000',
    color: '#fff',
  };

  return (
    <div className="App">
      <button className="btn" onClick={onOpenHandler}>
        Open Modal
      </button>
      // open (required) -> boolean state, onClose (required) -> function to close
      // style (optional) -> object to override the default style
      <Modal open={isModalOpen} onClose={onCloseHandler} style={style}>
        // pass anything here as children
        <h2>Hello</h2>
      </Modal>
    </div>
  );
}
```
