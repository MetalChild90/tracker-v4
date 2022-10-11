import PropTypes from "prop-types";

function calculatePercent(price, targetPrice) {
  return (((price - targetPrice) / targetPrice) * 100).toFixed(2);
}

calculatePercent.propTypes = {
  price: PropTypes.number.isRequired,
  targetPrice: PropTypes.number.isRequired,
};

export default calculatePercent;
