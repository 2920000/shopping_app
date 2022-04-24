const reverseArray = (array) => {
  if (!array || array.length === 0) {
    return;
  }
  const newArray = [];
  array.forEach((order) => {
    newArray.unshift(order);
  });
  return newArray;
};
export default reverseArray;
