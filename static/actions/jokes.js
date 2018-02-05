import api from '../api';

import {
  FETCH_ALL_JOKES_REQUEST, FETCH_ALL_JOKES_SUCCESS, FETCH_ALL_JOKES_FAILURE,
  FETCH_RANDOM_JOKES_REQUEST, FETCH_RANDOM_JOKES_SUCCESS, FETCH_RANDOM_JOKES_FAILURE,
  VOTE_JOKE_REQUEST, VOTE_JOKE_SUCCESS, VOTE_JOKE_FAILURE
} from '../action_types'

const fetch_jokes_request = () => ({
  type: FETCH_ALL_JOKES_REQUEST
})
const fetch_random_jokes_request = () => ({
  type: FETCH_RANDOM_JOKES_REQUEST
})
const fetch_jokes_success = data => ({
  type: FETCH_ALL_JOKES_SUCCESS,
  data
})
const fetch_random_jokes_success = data => ({
  type: FETCH_RANDOM_JOKES_SUCCESS,
  data
})
const fetch_jokes_failure = error => ({
  type: FETCH_ALL_JOKES_FAILURE,
  error
})
const fetch_random_jokes_failure = error => ({
  type: FETCH_RANDOM_JOKES_FAILURE,
  error
})
const vote_request = (id, vote) => ({
  type: VOTE_JOKE_REQUEST,
  id,
  vote
})

const ONE_MINUTE = 60000;

export const getInitialJokes = (lastFetch) => dispatch => {
  const now = new Date().valueOf();
  if(now - lastFetch < 2* ONE_MINUTE) { // In ms := two minutes
    // Improvement: This actually should return something "thenable"
    // in the event this function's return value is ever used.
    return
  }

  dispatch(fetch_jokes_request())
  return api.jokes.dashboard().then(data =>
    dispatch(fetch_jokes_success(data))
  ).catch(error => dispatch(fetch_jokes_failure(error)))
}

export const getRandomJokes = () => dispatch => {
  dispatch(fetch_random_jokes_request())
  return api.jokes.random().then(data =>
    dispatch(fetch_random_jokes_success(data)))
    .catch(error => dispatch(fetch_random_jokes_failure(error)))
}

export const vote = (id, vote) => dispatch => {
  dispatch(vote_request(id, vote))
  return api.jokes.vote(id, vote)
}
