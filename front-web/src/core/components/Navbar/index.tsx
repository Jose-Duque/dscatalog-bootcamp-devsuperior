import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.scss';

const Navbar = () => (
  <nav className="row bg-primary main-nav">
    <div className="col-3">
      <Link to="/" className="nav-logo-text">
        <h4>Ds Catalog</h4>
      </Link>
    </div>
    <div className="col-6">
      <ul className="main-menu">
        <li>
          <NavLink to="/" activeClassName="active" exact>HOME</NavLink>
        </li>
        <li>
          <NavLink to="/products" activeClassName="active">CATÁLAGO</NavLink>
        </li>
        <li>
          <NavLink to="/admin" activeClassName="active">ADMIN</NavLink>
        </li>
      </ul>
    </div>
    <div className="col-3 text-right">
      Login
    </div>
  </nav>
);

export default Navbar;
