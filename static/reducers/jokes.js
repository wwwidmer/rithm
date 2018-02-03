import {
  FETCH_ALL_JOKES_REQUEST, FETCH_ALL_JOKES_SUCCESS, FETCH_ALL_JOKES_FAILURE,
  FETCH_RANDOM_JOKES_REQUEST, FETCH_RANDOM_JOKES_SUCCESS, FETCH_RANDOM_JOKES_FAILURE,
  VOTE_JOKE_REQUEST, VOTE_JOKE_SUCCESS, VOTE_JOKE_FAILURE
} from '../action_types'

export function fetch_jokes_reducer(state = {
  top_jokes: [],
  bottom_jokes: [],
  random_jokes: []
}, action = {}) {
  switch(action.type) {
    case FETCH_RANDOM_JOKES_REQUEST:
    case FETCH_ALL_JOKES_REQUEST:
      return Object.assign({
        loading: true
      }, state)
    case FETCH_ALL_JOKES_SUCCESS:
      return {
        top_jokes: action.data.top,
        bottom_jokes: action.data.bottom,
        random_jokes: action.data.random,
        loading: false
      }
    case FETCH_RANDOM_JOKES_FAILURE:
    case FETCH_ALL_JOKES_FAILURE:
      return Object.assign({
        loading: false,
        error: action.error
      }, state)
    default:
      return state
  }
}

export function vote_reducer(state = {}, action = {}) {

}
