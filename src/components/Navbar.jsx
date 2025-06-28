import React from 'react';
import { FaPalette } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#!">
          <FaPalette className="me-2" size={24} />
          Canvas Builder
        </a>
        <div className="navbar-nav ms-auto">
          <span className="navbar-text">
            Create • Design • Export
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;