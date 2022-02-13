const isValidJSON = (json) => {
  try {
    JSON.parse(json);
  } catch (error) {
    return false;
  }
  return true;
};

module.exports = { isValidJSON };
