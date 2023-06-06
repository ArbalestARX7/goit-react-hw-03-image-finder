import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore, disabledBtn }) => {
  return (
    disabledBtn && (
      <button type="button" className={css.Button} onClick={onLoadMore}>
        Load more
      </button>
    )
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  disabledBtn: PropTypes.bool.isRequired,
};
