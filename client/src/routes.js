import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import Check from './Check';

const Routes = () => {
  return (
    <div>
    <Route exact path="/" component={App} />
    <Route path="/check" component={Check} />
    {/* <Route path="/cat" component={Cat} /> */}
  </div>
  );
}

export default Routes;