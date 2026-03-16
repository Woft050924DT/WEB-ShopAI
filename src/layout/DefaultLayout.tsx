import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

const DefaultLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;