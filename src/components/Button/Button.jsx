export const Button = ({ onLoadMore, disabledBtn }) => {
  return (
    disabledBtn && (
      <button type="button" className="Button" onClick={onLoadMore}>
        Load more
      </button>
    )
  );
};
