import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAcessTokenDecoded, logout } from '../../utils/auth';
import './style.scss';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState('');
  const location = useLocation();

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
  }

  useEffect(() => {
    const currentUserData = getAcessTokenDecoded();
    setCurrentUser(currentUserData.user_name);
  }, [location])

  return (
    <nav className="row bg-primary main-nav">
      <div className="col-3">
        <Link to="/" className="nav-logo-text">
          <h4>Ds Catalog</h4>
        </Link>
      </div>
      <div className="col-6">
        <ul className="main-menu">
          <li>
            <NavLink to="/" activeClassName="active" exact className="nav-link">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName="active" className="nav-link">CATÁLAGO</NavLink>
          </li>
          <li>
            <NavLink to="/admin" activeClassName="active" className="nav-link">ADMIN</NavLink>
          </li>
        </ul>
      </div>
      <div className="col-3 text-right">
        {currentUser && (
          <>
            {currentUser}
            <a 
              href="#logout"
              className="nav-link active d-inline"
              onClick={handleLogout}
            >
              LOGOUT
            </a>
          </>
        )}
        {!currentUser && (
          <Link to="/auth/login" className="nav-link active">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

