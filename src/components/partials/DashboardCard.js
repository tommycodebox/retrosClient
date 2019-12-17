import React from 'react';
import Moment from 'react-moment';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

const DashboardCard = ({ type, title, loading, all, loader }) => {
  return (
    <div className={type + ' card'}>
      <div className='title'>{title}</div>
      <div className='list'>
        {!loading && all ? (
          all.map(retro =>
            retro[type].map(item => (
              <Link to={'/retro/' + retro._id} className='item' key={uuid.v4()}>
                <div className='date'>
                  <Moment format='DD.MM'>{retro.date}</Moment>
                </div>
                <div className='name'>{item}</div>
                <div className='arrow'>></div>
              </Link>
            ))
          )
        ) : (
          <img width={40} src={loader} style={{ marginTop: 60 }} />
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
