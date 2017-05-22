/**
 * Created by dandan.wu on 16/9/13.
 */

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import redux_promise from 'redux-promise';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux'
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import dal from '../middleware/dal'

let middlewares = [
    redux_promise,
    thunk,
    dal,
    routerMiddleware(hashHistory)
];

middlewares.push(
    createLogger({collapsed: true})
);

let storeEnhancers = [
    applyMiddleware(...middlewares)
];

const composedCreateStore = compose(...storeEnhancers)(createStore);

function finalCreateStore(initialState) {
    return composedCreateStore(rootReducer, initialState);
}

const store = finalCreateStore();

export default store;
