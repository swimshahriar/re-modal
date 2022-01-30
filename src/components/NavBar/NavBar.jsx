import { useState } from 'react';
import Modal from '../../lib';
import './navbar.css';
import NavItem from './NavItem';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <ul>
          <li onClick={() => setOpen(true)}>Modal</li>
          <NavItem title="Dropdown" isDropdown>
            <NavItem title="Dropdown Inside" isDropdown>
              <p>I am nested dropdown</p>
            </NavItem>
          </NavItem>

          <NavItem title="Dropdown Draggable" isDropdown draggable>
            <p>I am draggable dropdown</p>
          </NavItem>
        </ul>
      </nav>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        isOverlay
        style={{ background: 'khaki' }}
      >
        Modal
      </Modal>
    </>
  );
};

export default NavBar;
