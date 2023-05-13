import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, tags } = image;
  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
