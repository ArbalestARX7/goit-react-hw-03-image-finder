export const ImageGalleryItem = ({ url, id, largeImageURL }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={url} alt="" />
    </li>
  );
};
