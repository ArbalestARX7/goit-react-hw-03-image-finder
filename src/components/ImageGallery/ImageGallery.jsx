import React, { Component } from 'react';
import { Notify, Report } from 'notiflix';
import PropTypes from 'prop-types';
import getPhotos from '../API/API';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    status: 'idle',
    disabledBtn: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    const oldQuerry = prevProps.imagesQuerry;
    const newQuerry = this.props.imagesQuerry;

    const oldPage = prevProps.page;
    const newPage = this.props.page;

    if (oldQuerry !== newQuerry) {
      try {
        this.setState({ status: 'pending' });
        const newImages = await getPhotos(newQuerry, newPage);

        this.setState({ images: newImages.data.hits, status: 'resolved' });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }

    if (oldPage !== newPage && newPage !== 1) {
      try {
        const moreImages = await getPhotos(newQuerry, newPage);

        console.log(moreImages.data.hits.length);

        if (moreImages.data.hits.length < 12) {
          this.setState({ disabledBtn: false });
          Notify.info('Sorry, this is the last images');
        }

        this.setState({
          images: [...this.state.images, ...moreImages.data.hits],
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  render() {
    const { images, status, disabledBtn } = this.state;

    if (status === 'idle') {
      return <h2>What are you searching for?</h2>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                largeImageURL={largeImageURL}
                onClick={this.props.showLargeImage}
              />
            ))}
          </ul>
          {images.length !== 0 && (
            <Button
              onLoadMore={this.props.onLoadMore}
              disabledBtn={disabledBtn}
            />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      Report.failure(
        'Oops, somthing wrong:(',
        'Please, try one more time.',
        'Ok'
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  imagesQuerry: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};
