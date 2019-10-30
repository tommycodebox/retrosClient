import React, { useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOne, toggle } from '../../actions/retro';
import loader from '../../assets/img/loader.gif';
import Moment from 'react-moment';
import uuid from 'uuid';

const Retro = ({ auth, match, getOne, toggle, retro: { loading, single } }) => {
  useEffect(() => {
    getOne(match.params.id);
  }, []);

  const toggleTodo = todo => {
    const retro = match.params.id;
    toggle(retro, todo);
  };

  return (
    <div className='Retro'>
      <Sidebar />
      <div className='Main'>
        <Header title='Retro' page='Retro' auth={auth} />
        <section className='board'>
          <div className='latest card'>
            <div className='title'>Main info</div>
            {!loading && single ? (
              <>
                <div className='list'>
                  <div className='item'>
                    <div className='name'>Title ∙ ∙ ∙ {single.name}</div>
                  </div>
                  <div className='item'>
                    <div className='name'>Type ∙ ∙ ∙ {single.type}</div>
                  </div>
                  <div className='item date'>
                    <div className='name'>
                      Date ∙ ∙ ∙{' '}
                      <Moment format='DD.MM.YY'>{single.date}</Moment>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <img width={40} src={loader} style={{ marginTop: 60 }} />
            )}
          </div>
          <div className='todos card'>
            <div className='title'>Todos</div>
            {!loading && single ? (
              <div className='list'>
                {single.todos.map(todo => (
                  <div
                    className='item'
                    key={todo._id}
                    onClick={() => toggleTodo(todo._id)}
                  >
                    <div
                      className='date'
                      style={{ color: todo.isDone ? 'limegreen' : 'crimson' }}
                    >
                      {todo.isDone ? '✓' : '✗'}
                    </div>
                    <div className='name'>{todo.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={loader}
                alt='loader'
                width={40}
                style={{ marginTop: 60 }}
              />
            )}
          </div>

          <div className='awesomes card'>
            <div className='title'>Awesomes</div>
            {!loading && single ? (
              <div className='list'>
                {single.awesomes.map(awesome => (
                  <div className='item' key={uuid.v4()}>
                    <div className='name'>{awesome}</div>
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={loader}
                alt='loader'
                width={40}
                style={{ marginTop: 60 }}
              />
            )}
          </div>
          <div className='deltas card'>
            <div className='title'>Deltas</div>
            {!loading && single ? (
              <div className='list'>
                {single.deltas.map(delta => (
                  <div className='item' key={uuid.v4()}>
                    <div className='name'>{delta}</div>
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={loader}
                alt='loader'
                width={40}
                style={{ marginTop: 60 }}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

Retro.propTypes = {
  auth: PropTypes.object.isRequired,
  retros: PropTypes.object.isRequired,
  getOne: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  retro: state.retro
});

export default connect(
  mapStateToProps,
  { getOne, toggle }
)(Retro);
