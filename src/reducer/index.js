import { combineReducers } from 'redux';

import lang from './lang';
import network from './network';
import list from './list';
import auth from './auth';
import location from "./location";

export default combineReducers({
  lang,
  network,
  list,
  auth,
  location
});
