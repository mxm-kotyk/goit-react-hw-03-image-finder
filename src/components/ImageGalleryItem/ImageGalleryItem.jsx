import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    return (
      <GalleryItem>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {this.state.modalOpen && (
          <Modal
            onClose={this.toggleModal}
            image={largeImageURL}
            altText={tags}
          />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.objectOf({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
