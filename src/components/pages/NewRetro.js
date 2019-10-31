import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import PropTypes from 'prop-types';
import {
  create,
  chooseType,
  updateConnected,
  updateStart,
  resetNew
} from '../../actions/retro';
import openSocket from 'socket.io-client';
import { setAlert } from '../../actions/alert';

const NewRetro = ({
  auth,
  setAlert,
  newRetro: { isChosen, type, people, connected, start, completed },
  create,
  updateConnected,
  updateStart,
  resetNew,
  chooseType,
  history
}) => {
  const [retro, setRetro] = useState({
    name: '',
    type: '',
    todos: [''],
    awesomes: [''],
    deltas: ['']
  });

  const [peopleCount, setPeopleCount] = useState('');

  const [socket, setSocket] = useState();

  useEffect(() => {
    const io = openSocket('http://192.168.33.82:5000');
    setSocket(io);

    auth.user &&
      io.on('connect', () => {
        io.emit('mob', { mob: auth.user.mob });
      });
    auth.user &&
      io.on(auth.user.mob, msg => {
        setRetro(msg);
        const inputs = document.querySelectorAll('input');
        inputs.forEach(
          input => input.value.length > 0 && input.classList.add('filled')
        );
      });

    io.on('started', msg => {
      updateStart();
    });

    return () => {
      auth.user && io.off(auth.user.mob);
      io.close();
      socket && socket.close();
    };
  }, [auth.user]);

  useEffect(() => {
    auth.user &&
      socket &&
      socket.on(auth.user.mob + '/mob', msg => {
        start && socket.emit('start', true);
        updater();
      });
    auth.user &&
      socket &&
      socket.on(auth.user.mob + '/completed', msg => {
        setAlert('Retro created', 'success');
        history.push('/');
      });
    auth.user &&
      completed &&
      socket &&
      socket.emit('completed', { mob: auth.user.mob });
    return () => {
      auth.user && socket && socket.off(auth.user.mob + '/mob');
      auth.user && socket && socket.off(auth.user.mob + '/completed');
    };
  }, [auth.user, connected, socket, start, completed]);

  const updater = () => {
    updateConnected();
    if (connected + 1 === people) {
      console.log(connected, people);
      updateStart();
      socket.emit('start', true);
    }
  };

  const send = msg => {
    msg.mob = auth.user.mob;
    socket && socket.emit('msg', msg);
  };

  const todosTyper = (e, num) => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    const updated = [...retro.todos];
    updated[num] = e.target.value;
    setRetro({ ...retro, todos: updated });
    send({ ...retro, todos: updated });
  };
  const awesomesTyper = (e, num) => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    const updated = [...retro.awesomes];
    updated[num] = e.target.value;
    setRetro({ ...retro, awesomes: updated });
    send({ ...retro, awesomes: updated });
  };
  const deltasTyper = (e, num) => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    const updated = [...retro.deltas];
    updated[num] = e.target.value;
    setRetro({ ...retro, deltas: updated });
    send({ ...retro, deltas: updated });
  };

  const addTodoInput = () => {
    const newTodo = '';
    const updated = [...retro.todos];
    updated.push(newTodo);
    setRetro({ ...retro, todos: updated });
    send({ ...retro, todos: updated });
  };
  const deleteTodoInput = num => {
    let updated = [...retro.todos];
    updated = updated.filter((_todo, index) => index !== num);
    setRetro({ ...retro, todos: updated });
    send({ ...retro, todos: updated });
  };
  const addAwesomeInput = () => {
    const newAwesome = '';
    const updated = [...retro.awesomes];
    updated.push(newAwesome);
    setRetro({ ...retro, awesomes: updated });
    send({ ...retro, awesomes: updated });
  };
  const deleteAwesomeInput = num => {
    let updated = [...retro.awesomes];
    updated = updated.filter((_awesome, index) => index !== num);
    setRetro({ ...retro, awesomes: updated });
    send({ ...retro, awesomes: updated });
  };
  const addDeltaInput = () => {
    const newDelta = '';
    const updated = [...retro.deltas];
    updated.push(newDelta);
    setRetro({ ...retro, deltas: updated });
    send({ ...retro, deltas: updated });
  };
  const deleteDeltaInput = num => {
    let updated = [...retro.deltas];
    updated = updated.filter((_delta, index) => index !== num);
    setRetro({ ...retro, deltas: updated });
    send({ ...retro, deltas: updated });
  };

  const inputHandler = e => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    setRetro({ ...retro, [e.target.name]: e.target.value });
    send({ ...retro, [e.target.name]: e.target.value });
  };

  const submitRetro = () => {
    create(retro, history);
  };

  const setupMultiple = e => {
    const multiple = document.querySelector('.multiple');
    multiple.classList.add('active');
    e.target.classList.add('active');
    e.target.textContent = 'How many people?';
  };

  const choose = retro => {
    chooseType(retro);
  };

  const peopleTyper = e => {
    if ((e.target.value < 6 && e.target.value > 2) || e.target.value === '') {
      setPeopleCount(e.target.value);
    }
  };

  return (
    <div className='New'>
      {/* Modal */}
      {!start && (
        <div className='modal-wrapper'>
          <div className='overlay'>
            <div className='Modal'>
              <div className='title'>Create new retro</div>
              <div className='choose'>Choose option..</div>
              {isChosen && (
                <div className='connects'>
                  connected: {connected} / {people}
                </div>
              )}
              <div className='btns'>
                <button onClick={() => choose({ type: 'one', people: 1 })}>
                  On 1 computer
                </button>
                <button className='multiple-btn' onClick={setupMultiple}>
                  On multiple computers
                </button>
                <div className='multiple'>
                  <input
                    type='number'
                    min='3'
                    max='5'
                    value={peopleCount}
                    onChange={peopleTyper}
                  />
                  <button
                    onClick={() =>
                      choose({ type: 'mob', people: Number(peopleCount) })
                    }
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Sidebar />
      <div className='Main'>
        <Header title='New retro' page='New' auth={auth} create={submitRetro} />
        <section className='board'>
          <div className='card'>
            <div className='title'>Main info</div>

            <div className='input-area'>
              <div className='input-group'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  onChange={inputHandler}
                  value={retro.name}
                />
                <label htmlFor='name'>Name</label>
              </div>
              <div className='input-group'>
                <input
                  type='text'
                  name='type'
                  id='type'
                  onChange={inputHandler}
                  value={retro.type}
                />
                <label htmlFor='type'>Type</label>
              </div>
            </div>
          </div>
          <div className='todos card'>
            <div className='title'>
              Todos
              <a href='#' className='more' onClick={addTodoInput}>
                +
              </a>
            </div>
            <div className='input-area todos-area'>
              {retro.todos.map((_todo, index) => (
                <div key={'todo-' + index} className='input-group'>
                  <input
                    type='text'
                    name='todo'
                    id='todo'
                    value={retro.todos[index]}
                    onChange={e => todosTyper(e, index)}
                  />
                  <label htmlFor='todo'>Todo</label>
                  <a
                    href='#'
                    className='btn remove-input'
                    onClick={() => deleteTodoInput(index)}
                  >
                    -
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className='awesomes card'>
            <div className='title'>
              Awesomes
              <a href='#' className='more' onClick={addAwesomeInput}>
                +
              </a>
            </div>
            <div className='input-area awesomes-area'>
              {retro.awesomes.map((_awesome, index) => (
                <div key={'awesome-' + index} className='input-group'>
                  <input
                    type='text'
                    name='awesome'
                    id='awesome'
                    value={retro.awesomes[index]}
                    onChange={e => awesomesTyper(e, index)}
                  />
                  <label htmlFor='awesome'>Awesome</label>
                  <a
                    href='#'
                    className='btn remove-input'
                    onClick={() => deleteAwesomeInput(index)}
                  >
                    -
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className='deltas card'>
            <div className='title'>
              Deltas
              <a href='#' className='more' onClick={addDeltaInput}>
                +
              </a>
            </div>
            <div className='input-area deltas-area'>
              {retro.deltas.map((_delta, index) => (
                <div key={'delta-' + index} className='input-group'>
                  <input
                    type='text'
                    name='delta'
                    id='delta'
                    value={retro.deltas[index]}
                    onChange={e => deltasTyper(e, index)}
                  />
                  <label htmlFor='delta'>Delta</label>
                  <a
                    href='#'
                    className='btn remove-input'
                    onClick={() => deleteDeltaInput(index)}
                  >
                    -
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

NewRetro.propTypes = {
  auth: PropTypes.object.isRequired,
  newRetro: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateStart: PropTypes.func.isRequired,
  updateConnected: PropTypes.func.isRequired,
  resetNew: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  chooseType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  newRetro: state.retro.new
});

export default connect(
  mapStateToProps,
  { create, chooseType, updateConnected, updateStart, resetNew, setAlert }
)(withRouter(NewRetro));
