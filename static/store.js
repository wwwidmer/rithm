import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { fetch_jokes_reducer } from './reducers/jokes'

const rootReducer = combineReducers({
	fetch_jokes_reducer
})

export default createStore(
    rootReducer, compose(applyMiddleware(thunk))
);
