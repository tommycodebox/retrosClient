import React, { useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import { setAlert } from '../../actions/alert';
import { getAll, getLatest, toggle } from '../../actions/retro';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../layout/Header';
import loader from '../../assets/img/loader.gif';
import TodosCard from '../partials/TodosCard';
import DashboardCard from '../partials/DashboardCard';
import LatestCard from '../partials/LatestCard';

const Dashboard = ({
  auth,
  getAll,
  getLatest,
  toggle,
  retro: { all, loading, latest }
}) => {
  useEffect(() => {
    getAll();
    getLatest();
  }, []);

  const toggleTodo = (retro, todo) => {
    toggle(retro, todo);
  };

  return (
    <div className='Dashboard'>
      <Sidebar />
      <div className='Main'>
        <Header title='Dashboard' page='Dashboard' auth={auth} />
        <section className='board'>
          <LatestCard loading={loading} latest={latest} />
          <TodosCard
            type='todos'
            title='Todos'
            loading={loading}
            all={all}
            toggleTodo={toggleTodo}
            loader={loader}
          />
          <DashboardCard
            type='awesomes'
            title='Awesomes'
            loading={loading}
            all={all}
            loader={loader}
          />
          <DashboardCard
            type='deltas'
            title='Deltas'
            loading={loading}
            all={all}
            loader={loader}
          />
        </section>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired,
  getLatest: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  retro: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  retro: state.retro
});

export default connect(mapStateToProps, {
  setAlert,
  getAll,
  getLatest,
  toggle
})(Dashboard);
