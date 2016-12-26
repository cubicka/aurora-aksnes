import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './reducer';
import ShoppingPage from './pages/shopping';
import CheckoutPage from './pages/checkout';
import OrderPage from './pages/order'

const history = syncHistoryWithStore(browserHistory, store)

function Root() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={ShoppingPage} />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/order" component={OrderPage} />
            </Router>
        </Provider>
    );
}

export default Root;
