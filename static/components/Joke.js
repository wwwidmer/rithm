import React, { Component } from 'react';

class Joke extends Component {
  constructor(props){
  	super(props);
  	this.state = {};
    this.vote = this.vote.bind(this)
  }
  vote(up_or_down){
    if (up_or_down == this.props.joke.vote)
      up_or_down = undefined;

    this.props.vote(this.props.joke.id, up_or_down)
  }

  render() {
    const { joke } = this.props;
    const upvote = joke.vote ? 'up': (joke.vote !== undefined ? 'down': '')
    return (
      <li className="list-group-item d-inline-block">
        <div className={`vote-icons ${upvote}`}>
          <div onClick={()=>this.vote(true)} className="upvote"><i className="fa fa-thumbs-up"></i></div>
          <div onClick={()=>this.vote(false)} className="downvote"><i className="fa fa-thumbs-down"></i></div>
        </div>
        { joke.joke }
      </li>
    );
  }
}


class Jokelist extends Component {

    render() {
        const { jokes, vote, id, extra, headerText } = this.props;
        const joke_elems = jokes.map( (joke, i) =>
          <Joke key={joke.id} vote={vote} joke={joke} />
        )
        return (
            <div id={id} className="col-md-8">
              <h3> {headerText} </h3>
              {extra}
              <ul className="list-group">
                {joke_elems}
              </ul>
            </div>
        );
    }
}

export default Jokelist;
