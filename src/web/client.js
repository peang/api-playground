import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";

import {createStore} from "redux";
import {browserHistory, Router} from "react-router";
import {Provider} from 'react-redux';
import {reducers} from './reducers';
import './../../scss/style.scss';

const initial_state = {}
const store = createStore(
    reducers,
    initial_state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('root')
);