import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = { querry: '', page: 1 };

  findImagesByQuerry = newQuerry => {
    this.setState({ querry: newQuerry, page: 1 });
  };

  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { querry, page } = this.state;
    return (
      <div className="App">
        <Searchbar onSearch={this.findImagesByQuerry} />
        <ImageGallery
          imagesQuerry={querry}
          page={page}
          onLoadMore={this.onLoadMore}
        />
      </div>
    );
  }
}

export default App;
