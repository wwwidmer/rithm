import React, {Component} from 'react';

class Joke extends Component {

  render() {
    const { joke } = this.props;


    return (
      <div>
        <p> { joke } </p>
      </div>
    );
  }
}


class Jokelist extends Component {

    render() {
        const { jokes, vote, id, extra, headerText } = this.props;
        const joke_elems = jokes.map( (joke, i) =>
          <Joke key={joke.id} vote={vote} joke={joke} />
        )
        console.log(joke_elems)
        return (
            <div id={id} className="col-md-3">
              <h3> {headerText} </h3>
              <ul>
              </ul>
              {extra}
            </div>
        );
    }
}

export default Jokelist;
