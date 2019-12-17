import React from 'react';

const Modal = ({
  isChosen,
  connected,
  people,
  choose,
  setupMultiple,
  peopleCount,
  peopleTyper
}) => {
  return (
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
  );
};

export default Modal;
