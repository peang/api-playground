import { combineReducers } from 'redux';

import {authentication} from './Components/Authentication/reducers';

export const reducers = combineReducers({
    authentication: authentication,
});