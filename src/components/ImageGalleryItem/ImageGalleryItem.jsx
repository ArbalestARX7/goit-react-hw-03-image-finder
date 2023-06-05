export const ImageGalleryItem = ({ url, id, largeImageURL, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={() => onClick(largeImageURL)}>
      <img className="ImageGalleryItem-image" src={url} alt="" />
    </li>
  );
};
