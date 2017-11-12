import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import RootReducer from "../reducers";

import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';


const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : {}

const store = createStore(
	RootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);


const history = syncHistoryWithStore(createHashHistory() , store);

export default store;

export {history};