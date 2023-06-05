import React, { Component } from 'react';
import { Report } from 'notiflix';

class Searchbar extends Component {
  state = {
    querry: '',
  };

  getQuerry = e => {
    this.setState({ querry: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSearch } = this.props;
    const { querry } = this.state;

    if (querry.trim() === '') {
      Report.info(
        'You need to write a request',
        'At your request, cool pictures will be uploaded :)',
        'OK'
      );
    }

    onSearch(querry);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button
            type="submit"
            className="SearchForm-button"
            onClick={this.handleSubmit}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.getQuerry}
            value={this.state.querry}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
