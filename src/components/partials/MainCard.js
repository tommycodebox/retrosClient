import React from 'react';

const MainCard = ({ retro, inputHandler }) => {
  return (
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
  );
};

export default MainCard;
