import { routerReducer } from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import cart from './cart'
import category from './category'
import etalase from './etalase'
import item from './item'

// import createLogger from 'redux-logger'
// const logger = createLogger()

const store = createStore(
    combineReducers({
        cart, category, etalase, item,
        routing: routerReducer,
    }),
    applyMiddleware(thunk)
);

export default store;
