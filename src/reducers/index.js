import { combineReducers } from 'redux';
import responsiveMenu from './ResponsiveMenu.js';
import {routerReducer } from "react-router-redux";

export default combineReducers({
 main: responsiveMenu,
 routing: routerReducer 
});