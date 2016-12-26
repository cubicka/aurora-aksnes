import { routerReducer, routerMiddleware } from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {browserHistory} from 'react-router'
import thunk from 'redux-thunk'
import cart from './cart'
import category from './category'
import etalase from './etalase'
import item from './item'
import auth from './auth'
import checkout from './checkout'
import order from './order'

// import createLogger from 'redux-logger'
// const logger = createLogger()
const routeMiddle = routerMiddleware(browserHistory)

const store = createStore(
    combineReducers({
        auth, cart, category, checkout, etalase, item, order,
        routing: routerReducer,
    }),
    applyMiddleware(thunk, routeMiddle)
    // applyMiddleware(thunk, logger, routeMiddle)
);

export default store;
