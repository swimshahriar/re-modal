import useState from 'storybook-addon-state';
import Modal from '../lib/components/Modal/Modal';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    open: {},
    onClose: {},
  },
};

export const BasicModal = () => {
  const [isOpen, setIsOpen] = useState('basic-state', false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello</h2>
      </Modal>
    </>
  );
};

export const NestedModal = () => {
  const [isOpen, setIsOpen] = useState('parent-state', false);
  const [isNestedOpen, setIsNestedOpen] = useState('nested-state', false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello</h2>
        <button onClick={() => setIsNestedOpen(true)}>Open Nested</button>
        <Modal open={isNestedOpen} onClose={() => setIsNestedOpen(false)}>
          <h2>Hello from Nested</h2>
        </Modal>
      </Modal>
    </>
  );
};
