import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/products';
import uiReducer from './reducers/ui';

import { products } from './../dummyProductsData.json'

const rootReducer = combineReducers({
    products: productsReducer,
    ui: uiReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    // pass initial products dummy data to the redux store
    return createStore(rootReducer, {products: {products}}, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;