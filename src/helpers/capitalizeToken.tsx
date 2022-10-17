const capitalize = (tokenName: string) => {
  return tokenName.charAt(0).toUpperCase() + tokenName.toLowerCase().slice(1);
};

const capitalizedToken = (tokenName: string) => {
  if (!tokenName.includes(" ")) {
    return capitalize(tokenName);
  } else {
    let fullName = "";
    const parts = tokenName.split(" ");
    if (parts[0].endsWith("X")) {
      fullName += parts[0].toUpperCase() + " ";
      const slicedParts = parts.slice(1);
      for (const slice of slicedParts) {
        fullName += capitalize(slice + " ");
      }
    } else {
      const parts = tokenName.split(" ");
      for (const part of parts) {
        fullName += capitalize(part + " ");
      }
    }
    return fullName;
  }
};

export default capitalizedToken;
