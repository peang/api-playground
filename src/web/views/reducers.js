import { combineReducers } from 'redux';

import {authentication} from './components/AuthHeader/reducers';

export const reducers = combineReducers({
    authentication: authentication,
});