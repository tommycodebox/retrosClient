import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/scss/App.scss';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/pages/Dashboard';
import Welcome from './components/pages/Welcome';
import NewRetro from './components/pages/NewRetro';
import Retro from './components/pages/Retro';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/welcome' component={Welcome} />
            <Route path='/new' component={NewRetro} />
            <Route path='/retro' component={Retro} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
