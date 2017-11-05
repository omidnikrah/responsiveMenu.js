import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import configStore, { history } from './store/createStore';

import routes from './routes';

import './styles/style.scss';


render(
	<Provider store={configStore}>
		<Router history={history} routes={routes}>
		</Router>
	</Provider>
,document.getElementById('app'));