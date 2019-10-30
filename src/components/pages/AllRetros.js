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
import { getAll } from '../../actions/retro';

const AllRetros = ({ getAll, retro: { all, loading }, auth }) => {
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className='AllRetros'>
      <Sidebar />
      <div className='Main'>
        <Header title='All retros' page='All' auth={auth} />
        <section className='board'>
          <div className='card all-retros-card'>
            <div className='title'>Awesomes</div>
            <div className='list'>
              {!loading && all ? (
                all.map(retro => (
                  <Link
                    to={'/retro/' + retro._id}
                    className='item'
                    key={uuid.v4()}
                  >
                    <div className='date'>
                      <Moment format='DD.MM'>{retro.date}</Moment>
                    </div>
                    <div className='name'>{retro.name}</div>
                    <div className='arrow'>></div>
                  </Link>
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

AllRetros.propTypes = {
  retro: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  retro: state.retro,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAll }
)(AllRetros);
