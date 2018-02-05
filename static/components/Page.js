import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRandomJokes, getInitialJokes, vote } from '../actions/jokes';

import Jokelist from './Joke';
import Error from './Error';

class Page extends Component {
    constructor(props){
    	super(props);
    	this.state = {};

      this.vote = this.vote.bind(this)
      this.getRandomJokes = this.getRandomJokes.bind(this)
    }

    componentDidMount() {
        this.props.getInitialJokes(
          this.props.top_jokes.lastFetch
        );
    }

    vote (id, vote) {
        this.props.vote(id, vote);
    }

    getRandomJokes () {
        this.props.getRandomJokes();
    }

    render() {
        const { top_jokes, bottom_jokes, random_jokes, loading, error } = this.props;
        const disabledClass = loading ? 'disabled': '';
        return (
          <div className="row">
            {error && <Error error={error} />}
            {loading && <i className='overlay fa fa-refresh fa-spin fa-4x' />}
            <Jokelist id="top" headerText="Best jokes" vote={this.vote} jokes={top_jokes.items} />
            <Jokelist id="bottom" headerText="Worst jokes" vote={this.vote} jokes={bottom_jokes.items} />
            <Jokelist id="random" headerText="Random jokes" vote={this.vote} jokes={random_jokes.items}
              extra={
                <a className={`btn btn-primary ${disabledClass}`} href="#" role="button"
                  onClick={this.getRandomJokes}
                >
                  Show more
                </a>
              }
            />
          </div>
        );
    }
}

function mapStateToProps(state) {
    function merge(jokes, latest) {
      for (var i = 0; i< jokes.items.length; i++) {
        jokes.items[i] = latest[jokes.items[i].id]
      }
    }

    const { fetch_jokes, jokes } = state;
    const { top_jokes,
      bottom_jokes,
      random_jokes,
      loading,
      error
    } = fetch_jokes;

    merge(random_jokes, jokes)
    merge(top_jokes, jokes)
    merge(bottom_jokes, jokes)

    return {
      top_jokes, bottom_jokes, random_jokes,
      loading, error,
      jokes
    }
}

export default connect(mapStateToProps, {
    getRandomJokes, getInitialJokes, vote
})(Page);
