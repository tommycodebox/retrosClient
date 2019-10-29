import React from 'react';
import Sidebar from '../layout/Sidebar';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Dashboard = ({ setAlert }) => {
  const menuHandler = e => {
    const sidebar = document.querySelector('.Sidebar');
    const main = document.querySelector('.Main');

    e.target.classNameList.toggle('active');
    setTimeout(() => {
      sidebar.classNameList.toggle('active');
      main.classNameList.toggle('active');
    }, 300);
  };

  return (
    <div className='Dashboard'>
      <Sidebar />
      <div className='Main'>
        <header>
          <a
            href='#'
            className='create'
            onClick={() => setAlert('cool', 'danger')}
          >
            <span>New</span>
          </a>
          <div className='title'>Dashboard</div>
          <div className='profile'>
            <div>
              Tom F.
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
        <section className='board'>
          <div className='latest card'>
            <div className='title'>
              Latest Retro
              <a href='#' className='more'>
                >
              </a>
            </div>
            <div className='area'>
              <div className='area-title'>Friday retro</div>
              <div className='awesomes'>
                A<span className='hide'>wesomes</span>
                <span className='count'>5</span>
              </div>
              <div className='deltas'>
                D<span className='hide'>eltas</span>
                <span className='count'>5</span>
              </div>
              <div className='todos-title'>Todos</div>
              <div className='todos'>
                <ul className='list'>
                  <li>Respect the timer</li>
                  <li>Respect the timer</li>
                  <li>Respect the timer</li>
                  <li>Respect the timer</li>
                  <li>Respect the timer</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='todos card'>
            <div className='title'>Todos</div>
            <div className='list'>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
            </div>
          </div>

          <div className='awesomes card'>
            <div className='title'>Awesomes</div>
            <div className='list'>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
            </div>
          </div>
          <div className='deltas card'>
            <div className='title'>Deltas</div>
            <div className='list'>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
              <a href='#' className='item'>
                <div className='date'>20.04.19</div>
                <div className='name'>Friday retro</div>
                <div className='arrow'>></div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Dashboard);
