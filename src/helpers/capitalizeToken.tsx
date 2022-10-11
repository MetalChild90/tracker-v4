const capitalizedToken = (tokenName) => {
  return tokenName.charAt(0).toUpperCase() + tokenName.toLowerCase().slice(1);
};

export default capitalizedToken;
