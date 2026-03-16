import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const DefaultLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main>
        <Outlet />
        <Sidebar />
      </main>
    </div>
  );
};

export default DefaultLayout;