import { useState, useRef } from 'react';
import Modal from '../../lib';

const NavItem = ({
  title,
  isDropdown,
  draggable,
  overlay = false,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const targetRef = useRef(null);

  if (!isDropdown) {
    return <li>{title}</li>;
  } else {
    return (
      <>
        <li ref={targetRef} onClick={() => setOpen(true)}>
          {title}
        </li>
        <Modal
          type="dropdown"
          targetRef={targetRef}
          draggable={draggable}
          overlay={overlay}
          open={open}
          onClose={() => setOpen(false)}
          style={{ background: 'purple' }}
          dragAreaStyle={{ background: 'khaki', color: 'purple' }}
        >
          {children}
        </Modal>
      </>
    );
  }
};

export default NavItem;
