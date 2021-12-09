### Installation

```zsh
npm i re-modal
# or
yarn add re-modal
```

### Examples

```jsx
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
```
