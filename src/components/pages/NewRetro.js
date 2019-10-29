import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';

const NewRetro = () => {
  const [retro, setRetro] = useState({
    name: '',
    type: '',
    todos: [''],
    awesomes: [''],
    deltas: ['']
  });

  const todosTyper = (e, num) => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    const updated = [...retro.todos];
    updated[num] = e.target.value;
    setRetro({ ...retro, todos: updated });
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
  };

  const addTodoInput = () => {
    const newTodo = '';
    const updated = [...retro.todos];
    updated.push(newTodo);
    setRetro({ ...retro, todos: updated });
  };
  const deleteTodoInput = num => {
    let updated = [...retro.todos];
    updated = updated.filter((_todo, index) => index !== num);
    setRetro({ ...retro, todos: updated });
  };
  const addAwesomeInput = () => {
    const newAwesome = '';
    const updated = [...retro.awesomes];
    updated.push(newAwesome);
    setRetro({ ...retro, awesomes: updated });
  };
  const deleteAwesomeInput = num => {
    let updated = [...retro.awesomes];
    updated = updated.filter((_awesome, index) => index !== num);
    setRetro({ ...retro, awesomes: updated });
  };
  const addDeltaInput = () => {
    const newDelta = '';
    const updated = [...retro.deltas];
    updated.push(newDelta);
    setRetro({ ...retro, deltas: updated });
  };
  const deleteDeltaInput = num => {
    let updated = [...retro.deltas];
    updated = updated.filter((_delta, index) => index !== num);
    setRetro({ ...retro, deltas: updated });
  };

  const menuHandler = e => {
    const sidebar = document.querySelector('.Sidebar');
    const main = document.querySelector('.Main');

    e.target.classList.toggle('active');
    setTimeout(() => {
      sidebar.classList.toggle('active');
      main.classList.toggle('active');
    }, 300);
  };

  const inputHandler = e => {
    setRetro({ ...retro, [e.target.name]: e.target.value });
  };

  return (
    <div className='New'>
      <Sidebar />
      <div className='Main'>
        <header className='new'>
          <a href='#' className='create save'>
            <i className='fas fa-save fa-lg'></i>
            <span></span>
          </a>
          <div className='title'>New retro</div>
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

export default NewRetro;
