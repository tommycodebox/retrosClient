import React from 'react';
import Sidebar from '../layout/Sidebar';

const Retro = () => {
  const menuHandler = e => {
    const sidebar = document.querySelector('.Sidebar');
    const main = document.querySelector('.Main');

    e.target.classList.toggle('active');
    setTimeout(() => {
      sidebar.classList.toggle('active');
      main.classList.toggle('active');
    }, 300);
  };

  return (
    <div class='Retro'>
      <Sidebar />
      <div class='Main'>
        <header>
          <a href='#' class='create retro'>
            <i class='fas fa-long-arrow-alt-left'></i>
            <span></span>
          </a>
          <div class='title'>Retro</div>
          <div class='profile'>
            <div>
              Tom F.
              <span></span>
            </div>
            <i class='fas fa-id-badge fa-2x'></i>
          </div>
          <div class='hamburger' onClick={menuHandler}>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
          </div>
        </header>
        <section class='board'>
          <div class='latest card'>
            <div class='title'>Main info</div>
            <div class='list'>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Type</div>
              </div>
              <div class='item date'>
                <div class='name'>20.04.19</div>
              </div>
            </div>
          </div>
          <div class='todos card'>
            <div class='title'>Todos</div>
            <div class='list'>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
            </div>
          </div>

          <div class='awesomes card'>
            <div class='title'>Awesomes</div>
            <div class='list'>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
            </div>
          </div>
          <div class='deltas card'>
            <div class='title'>Deltas</div>
            <div class='list'>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
              <div class='item'>
                <div class='name'>Friday retro</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Retro;
