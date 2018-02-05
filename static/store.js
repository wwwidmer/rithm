import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { fetch_jokes_reducer, jokes } from './reducers/jokes'

const rootReducer = combineReducers({
	fetch_jokes: fetch_jokes_reducer,
  jokes
})

export default createStore(
    rootReducer, compose(applyMiddleware(thunk))
);
