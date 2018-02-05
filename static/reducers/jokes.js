import {
  FETCH_ALL_JOKES_REQUEST, FETCH_ALL_JOKES_SUCCESS, FETCH_ALL_JOKES_FAILURE,
  FETCH_RANDOM_JOKES_REQUEST, FETCH_RANDOM_JOKES_SUCCESS, FETCH_RANDOM_JOKES_FAILURE,
  VOTE_JOKE_REQUEST, VOTE_JOKE_SUCCESS, VOTE_JOKE_FAILURE
} from '../action_types'

const cache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(
      value
  ))
}

export function jokes(
  state = JSON.parse(localStorage.getItem('jokesById') || '{}'),
  action = {}
) {
  switch (action.type) {
    case VOTE_JOKE_REQUEST:
      const new_state =  Object.assign({}, state, {
          [action.id]: Object.assign({}, state[action.id] || {}, {
              vote: action.vote
          })
      })
      cache('jokesById', new_state)
      return new_state;
    case FETCH_ALL_JOKES_SUCCESS:
    case FETCH_RANDOM_JOKES_SUCCESS:
      const jokes_by_id = {};
      for (var key in action.data) {
        for (var i = 0; i < action.data[key].items.length; i++) {
          const joke = action.data[key].items[i];
          jokes_by_id[joke.id] = joke;
        }
      }

      const after_fetch_new_state = Object.assign({}, state,
          jokes_by_id
      )
      cache('jokesById', after_fetch_new_state)
      return after_fetch_new_state;
  }
  return state;
}


export function fetch_jokes_reducer(state = {
  top_jokes: JSON.parse(localStorage.getItem('bottomJokesCache') || '{"items": []}'),
  bottom_jokes: JSON.parse(localStorage.getItem('topJokesCache') || '{"items": []}'),
  random_jokes: JSON.parse(localStorage.getItem('randomJokesCache') || '{"items": []}')
}, action = {}) {

  const lastFetch = new Date().valueOf();

  switch(action.type) {
    case FETCH_RANDOM_JOKES_REQUEST:
    case FETCH_ALL_JOKES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case FETCH_ALL_JOKES_SUCCESS:
      const top_jokes = Object.assign({
         lastFetch
       }, action.data.top)
     const bottom_jokes = Object.assign({
        lastFetch
      }, action.data.bottom)
      const random_jokes = Object.assign({
         lastFetch
       }, action.data.random)
      cache('topJokesCache', top_jokes)
      cache('bottomJokesCache', bottom_jokes)
      cache('randomJokesCache', random_jokes)
      return {
        top_jokes,
        bottom_jokes,
        random_jokes,
        loading: false
      }
    case FETCH_RANDOM_JOKES_SUCCESS:
      const random_jokes_fetched = Object.assign({
         lastFetch
       }, action.data.random)
      cache('randomJokesCache', random_jokes_fetched)
      return Object.assign({}, state,
        {
          loading: false,
          random_jokes: random_jokes_fetched
        }
      )
    case FETCH_RANDOM_JOKES_FAILURE:
    case FETCH_ALL_JOKES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    default:
      return state
  }
}

export function vote_reducer(state = {}, action = {}) {

}
