import React from 'react';

const TodosCard = ({ type, title, loading, all, toggleTodo, loader }) => {
  return (
    <div className={type + ' card'}>
      <div className='title'>{title}</div>
      <div className='list'>
        {!loading && all ? (
          all.map(retro =>
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
  );
};

export default TodosCard;
