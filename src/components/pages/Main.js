import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../routing/PrivateRoute';
import PropTypes from 'prop-types';

// Components
import Dashboard from './Dashboard';
import Welcome from './Welcome';
import NewRetro from './NewRetro';
import Retro from './Retro';
import AllRetros from './AllRetros';
import Mobs from './Mobs';

import loader from '../../assets/img/loader.gif';

// Redux
import { connect } from 'react-redux';

const Main = ({ auth: { loading, isAuth } }) => {
  return (
    <>
      {!loading ? (
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path='/welcome' component={Welcome} />
          <PrivateRoute path='/new' component={NewRetro} />
          <PrivateRoute path='/retro/:id' component={Retro} />
          <PrivateRoute path='/all' component={AllRetros} />
          <PrivateRoute path='/mobs' component={Mobs} />
        </Switch>
      ) : (
        <div style={styles.loadingBox}>
          <img src={loader} alt='loader' style={styles.loader} />
        </div>
      )}
    </>
  );
};

const styles = {
  loadingBox: {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    background: '#1e1e2f'
  },
  loader: {
    width: 50
  }
};

Main.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Main);
