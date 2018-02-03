import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRandomJokes, getInitialJokes, vote } from '../actions/jokes';

import Jokelist from './Joke';

class Page extends Component {
    componentDidMount() {
        this.props.getInitialJokes();
    }

    vote (id, vote) {
        this.props.vote(id, vote);
    }

    getRandomJokes (){
        this.props.getRandomJokes();
    }

    render() {
        const { top_jokes, bottom_jokes, random_jokes } = this.props;
        console.log(this.props)
        return (
            <div className="container">
              <div className="row">
                <Jokelist id="top" headerText="5 Best jokes" vote={this.vote} jokes={top_jokes} />
                <Jokelist id="bottom" headerText="5 Worst jokes" vote={this.vote} jokes={bottom_jokes} />
                <Jokelist id="random" headerText="20 Random jokes" vote={this.vote} jokes={random_jokes}
                  extra={
                    <a className="btn btn-primary" href="#" role="button" onClick={this.getRandomJokes}>
                      Show more
                    </a>
                  }
                />
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { top_jokes, bottom_jokes, random_jokes } = state.fetch_jokes_reducer;
    return {
      top_jokes, bottom_jokes, random_jokes
    }
}

export default connect(mapStateToProps, {
    getRandomJokes, getInitialJokes, vote
})(Page);
