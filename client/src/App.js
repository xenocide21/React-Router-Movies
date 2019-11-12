import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      movieList: null
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    const findMovie = savedList.find(el => movie.id === el.id);
    if (findMovie) {
      this.setState({movieInList: `This movie has already been saved.`});
    } else {
      savedList.push(movie);
    }

    this.setState({ savedList });
  };


  render() {
    const {movieInList} = this.state;
    return (
        <div>
          {movieInList !== null ? (
              <h2 className="warn">{movieInList}</h2>
          ) : null}

          <SavedList list={this.state.savedList}/>
          <Route exact path="/" component={MovieList}/>
          <Route path="/movies/:id" render={props => (<Movie {...props} addToSavedList={this.addToSavedList}/>)}/>
        </div>
    );
  }
}
