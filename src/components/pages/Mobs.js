import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Modules
import uuid from 'uuid';
import Moment from 'react-moment';
import loader from '../../assets/img/loader.gif';
import lineLoader from '../../assets/img/lineLoader.gif';

// Components
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';

// Redux
import { connect } from 'react-redux';
import { getAllRetros } from '../../actions/retro';

const Mobs = ({ getAllRetros, retro: { all, loading }, auth }) => {
  useEffect(() => {
    getAllRetros();
  }, []);
  const mobs = [
    'Web White Whales',
    '2Pack',
    'Fantastic4',
    'TechCrackerz',
    'Itchy',
    'LTE4',
    'Kamel()'
  ];
  return (
    <div className='Mobs'>
      <Sidebar />
      <div className='Main'>
        <Header title='Mobs' page='Mobs' auth={auth} />
        <section className='board'>
          <div className='card all-retros-card'>
            <div className='title'>Retros Leaderboard</div>
            <div className='list'>
              {!loading && all ? (
                mobs
                  .sort((a, b) => {
                    if (
                      all.filter(r => r.mob === a).length <
                      all.filter(r => r.mob === b).length
                    ) {
                      return 1;
                    }
                    if (
                      all.filter(r => r.mob === a).length >
                      all.filter(r => r.mob === b).length
                    ) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((mob, index) => (
                    <div className='item' key={uuid.v4()}>
                      <div className='date'>{index + 1}</div>
                      <div className='name'>{mob}</div>
                      <div className='arrow'>
                        {all.filter(retro => retro.mob === mob).length}
                      </div>
                    </div>
                  ))
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

Mobs.propTypes = {
  retro: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllRetros: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  retro: state.retro,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllRetros }
)(Mobs);
