import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Counter from './pages/Counter';
import Heroes from './pages/Heroes';
import NoMatch from './pages/NoMatch';

import '../assets/css/App.scss';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/heroes' component={Heroes} />
        <Route component={NoMatch} />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);