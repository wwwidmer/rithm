import api from '../api';

import {
  FETCH_ALL_JOKES_REQUEST, FETCH_ALL_JOKES_SUCCESS, FETCH_ALL_JOKES_FAILURE,
  FETCH_RANDOM_JOKES_REQUEST, FETCH_RANDOM_JOKES_SUCCESS, FETCH_RANDOM_JOKES_FAILURE,
  VOTE_JOKE_REQUEST, VOTE_JOKE_SUCCESS, VOTE_JOKE_FAILURE
} from '../action_types'

const fetch_jokes_request = () => ({
  type: FETCH_ALL_JOKES_REQUEST
})
const fetch_jokes_success = data => ({
  type: FETCH_ALL_JOKES_SUCCESS,
  data
})
const fetch_jokes_failure = data => ({
  type: FETCH_ALL_JOKES_FAILURE,
  data
})


export const getInitialJokes = () => dispatch => {
  dispatch(fetch_jokes_request())
  return api.jokes.dashboard().then(data =>
    dispatch(fetch_jokes_success(data))
  )
}

export const getRandomJokes = () => {}

export const vote = (id, vote) => {}
