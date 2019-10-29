import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/scss/App.scss';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/pages/Dashboard';
import Welcome from './components/pages/Welcome';
import NewRetro from './components/pages/NewRetro';
import Retro from './components/pages/Retro';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route path='/welcome' component={Welcome} />
            <PrivateRoute path='/new' component={NewRetro} />
            <PrivateRoute path='/retro/:id' component={Retro} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
