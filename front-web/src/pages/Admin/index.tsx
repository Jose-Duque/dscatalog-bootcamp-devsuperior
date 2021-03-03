import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../core/components/Routes/PrivateRoute';
import Navbar from './components/Navbar';
import Products from './components/Products';
import './styles.scss';

const Admin = () => {
 return (
  <div className="admin-container">
    <Navbar/>
    <div className="admin-content">
      <Switch>
        <PrivateRoute path="/admin/products">
          <Products/>
        </PrivateRoute>
        <PrivateRoute path="/admin/categories">
          Category
        </PrivateRoute>
        <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
          User
        </PrivateRoute>
      </Switch>
    </div>
  </div>
) 
};

export default Admin;