import React from 'react';
import lineLoader from '../../assets/img/lineLoader.gif';
import { Link } from 'react-router-dom';
import loader from '../../assets/img/loader.gif';

const LatestCard = ({ loading, latest }) => {
  return (
    <div className='latest card'>
      <div className='title'>
        Latest Retro
        <Link
          to={!loading && latest ? '/retro/' + latest._id : '/'}
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
              latest.todos
                .slice(0, 4)
                .map(todo => <li key={todo._id}>{todo.name}</li>)
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
  );
};

export default LatestCard;
