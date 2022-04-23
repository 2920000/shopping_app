function convertPriceFilter(str) {
  let price
  switch (str) {
    case "Dưới 600.000 đ":
        price = '0,600000';
      break;
    case "600.000 đ - 1.200.000 đ":
       price='600000,1200000'
      break;

    case "1.200.000 đ - 3.000.000 đ":
        price = '1200000,100000000';
      break;

    default:
  }
  return  price
}
export default convertPriceFilter;
