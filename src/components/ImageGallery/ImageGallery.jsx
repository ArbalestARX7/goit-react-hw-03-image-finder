import React, { Component } from 'react';
import getPhotos from '../API/API';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Oval } from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const oldQuerry = prevProps.imagesQuerry;
    const newQuerry = this.props.imagesQuerry;

    const oldPage = prevProps.page;
    const newPage = this.props.page;

    if (oldQuerry !== newQuerry) {
      this.setState({ status: 'pending' });
      const newImages = await getPhotos(newQuerry, newPage);

      this.setState({ images: newImages.data.hits, status: 'resolved' });
    }

    if (oldPage !== newPage && newPage !== 1) {
      const moreImages = await getPhotos(newQuerry, newPage);

      this.setState({
        images: [...this.state.images, ...moreImages.data.hits],
      });
    }
  }

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return <h2>What are you searching for?</h2>;
    }

    if (status === 'pending') {
      return (
        <Oval
          height={80}
          width={80}
          color="#303f9f"
          wrapperStyle={{}}
          wrapperClass="Spinner"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#3f51b5"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </ul>
          {images.length !== 0 && <Button onLoadMore={this.props.onLoadMore} />}
        </>
      );
    }

    if (status === 'rejected') {
    }
  }
}

export default ImageGallery;
