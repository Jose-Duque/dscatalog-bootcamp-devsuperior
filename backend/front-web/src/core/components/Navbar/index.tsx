import React from 'react';
import './style.scss';

const Navbar = () => (
  <nav className="row bg-primary main-nav">
    <div className="col-2">
      <a href="http://" className="nav-logo-text">
        <h4>Ds Catalog</h4>
      </a>
    </div>
    <div className="col-6 offset-2">
      <ul className="main-menu">
        <li>
          <a href="" className="active">HOME</a>
        </li>
        <li>
          <a href="">CATÁLAGO</a>
        </li>
        <li>
          <a href="">ADMIN</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
