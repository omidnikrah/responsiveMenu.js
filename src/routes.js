import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/Main';
import Result from './containers/Result';
import ResponsiveMenuFrom from './components/elements/ResponsiveMenuForm';


export default (
  <Route path="/" component={Main}>
		 <IndexRoute component={ResponsiveMenuFrom} /> 
		 <Route path="/result" component={Result} /> 
  </Route>
);

