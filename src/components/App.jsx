import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    querry: '',
    page: 1,
    largeImage: '',
    showModal: false,
  };

  showModal = image => {
    this.setState({ showModal: true, largeImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  findImagesByQuerry = newQuerry => {
    this.setState({ querry: newQuerry, page: 1 });
  };

  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { querry, page, largeImage, showModal } = this.state;
    return (
      <div className="App">
        <Searchbar onSearch={this.findImagesByQuerry} />
        <ImageGallery
          imagesQuerry={querry}
          page={page}
          onLoadMore={this.onLoadMore}
          showLargeImage={this.showModal}
        />
        {showModal && <Modal largeImage={largeImage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default App;
