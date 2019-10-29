import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ title, page, auth: { loading, isAuth, user }, create }) => {
  const menuHandler = e => {
    const sidebar = document.querySelector('.Sidebar');
    const main = document.querySelector('.Main');

    e.target.classList.toggle('active');
    setTimeout(() => {
      sidebar.classList.toggle('active');
      main.classList.toggle('active');
    }, 300);
  };

  const dashboardBtn = (
    <Link to='/new' className='create'>
      <span>New</span>
    </Link>
  );

  const newBtn = (
    <button className='create save' onClick={() => create()}>
      <i className='fas fa-save fa-lg'></i>
      <span></span>
    </button>
  );

  const retroBtn = (
    <Link to='/' className='create retro'>
      <i className='fas fa-long-arrow-alt-left'></i>
      <span></span>
    </Link>
  );

  return (
    <header>
      {page === 'Dashboard' && dashboardBtn}
      {page === 'New' && newBtn}
      {page === 'Retro' && retroBtn}
      <div className='title'>{title}</div>
      <div className='profile'>
        <div>
          {!loading && isAuth && user && user.name}
          <span></span>
        </div>
        <i className='fas fa-id-badge fa-2x'></i>
      </div>
      <div className='hamburger' onClick={menuHandler}>
        <span className='line'></span>
        <span className='line'></span>
        <span className='line'></span>
      </div>
    </header>
  );
};

Header.defaultProps = {
  create: null,
  retro: null
};

export default Header;
