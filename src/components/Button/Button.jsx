export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className="Button" onClick={onLoadMore}>
      Load more
    </button>
  );
};
