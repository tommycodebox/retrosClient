import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { setAlert } from '../../actions/alert';
import { getAll, getLatest, toggle } from '../../actions/retro';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../layout/Header';
import Moment from 'react-moment';
import uuid from 'uuid';
import loader from '../../assets/img/loader.gif';
import lineLoader from '../../assets/img/lineLoader.gif';

const Dashboard = ({
  setAlert,
  auth,
  getAll,
  getLatest,
  toggle,
  retro: { all, loading, latest }
}) => {
  useEffect(() => {
    getAll();
    getLatest();
  }, []);

  const toggleTodo = (retro, todo) => {
    toggle(retro, todo);
  };

  return (
    <div className='Dashboard'>
      <Sidebar />
      <div className='Main'>
        <Header title='Dashboard' page='Dashboard' auth={auth} />
        <section className='board'>
          <div className='latest card'>
            <div className='title'>
              Latest Retro
              <Link
                to={!loading && latest && '/retro/' + latest._id}
                className='more'
              >
                >
              </Link>
            </div>
            <div className='area'>
              {!loading && latest ? (
                <div className='area-title'>{latest.name}</div>
              ) : (
                <div className='area-title'>
                  {latest ? <img src={lineLoader} width={50} /> : 'n/a'}
                </div>
              )}
              <div className='awesomes'>
                A<span className='hide'>wesomes</span>
                <span className='count'>
                  {!loading && latest ? latest.awesomes.length : '-'}
                </span>
              </div>
              <div className='deltas'>
                D<span className='hide'>eltas</span>
                <span className='count'>
                  {!loading && latest ? latest.deltas.length : '-'}
                </span>
              </div>
              <div className='todos-title'>Todos</div>
              <div className='todos'>
                <ul className='list'>
                  {!loading && latest ? (
                    latest.todos.slice(0, 4).map(todo => <li>{todo.name}</li>)
                  ) : (
                    <li>
                      {latest ? (
                        <img
                          width={30}
                          src={loader}
                          style={{
                            marginTop: 'calc(50% - 15px)',
                            marginLeft: 'calc(50% - 15px)'
                          }}
                        />
                      ) : (
                        'Latest retro todos will display here'
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className='todos card'>
            <div className='title'>Todos</div>
            <div className='list'>
              {!loading && all ? (
                all.reverse().map(retro =>
                  retro.todos.map(todo => (
                    <div
                      className='item'
                      key={todo._id}
                      onClick={() => toggleTodo(retro._id, todo._id)}
                    >
                      <div
                        className='date'
                        style={{ color: todo.isDone ? 'limegreen' : 'crimson' }}
                      >
                        {todo.isDone ? '✓' : '✗'}
                      </div>
                      <div className='name'>{todo.name}</div>
                    </div>
                  ))
                )
              ) : (
                <img width={40} src={loader} style={{ marginTop: 60 }} />
              )}
            </div>
          </div>

          <div className='awesomes card'>
            <div className='title'>Awesomes</div>
            <div className='list'>
              {!loading && all ? (
                all.reverse().map(retro =>
                  retro.awesomes.map(awesome => (
                    <Link to={'/' + retro._id} className='item' key={uuid.v4()}>
                      <div className='date'>
                        <Moment format='DD.MM'>{retro.date}</Moment>
                      </div>
                      <div className='name'>{awesome}</div>
                      <div className='arrow'>></div>
                    </Link>
                  ))
                )
              ) : (
                <img width={40} src={loader} style={{ marginTop: 60 }} />
              )}
            </div>
          </div>
          <div className='deltas card'>
            <div className='title'>Deltas</div>
            <div className='list'>
              {!loading && all ? (
                all.reverse().map(retro =>
                  retro.deltas.map(delta => (
                    <Link to={'/' + retro._id} className='item' key={uuid.v4()}>
                      <div className='date'>
                        <Moment format='DD.MM'>{retro.date}</Moment>
                      </div>
                      <div className='name'>{delta}</div>
                      <div className='arrow'>></div>
                    </Link>
                  ))
                )
              ) : (
                <img width={40} src={loader} style={{ marginTop: 60 }} />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
  getLatest: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  retro: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  retro: state.retro
});

export default connect(
  mapStateToProps,
  { setAlert, getAll, getLatest, toggle }
)(Dashboard);
