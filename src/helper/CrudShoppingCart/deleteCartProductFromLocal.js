import { addLocalStorage } from "../StorageUtilties";

const { UPDATE_PRODUCTS_IN_CART } = require("../../features/cartSlice");

const deleteCartProductFromLocal = (allCartProducts, id, dispatch, local) => {
  const filterCartProduct = allCartProducts.filter(
    (product) => (product._id || product.id) !== id
  );
  local && addLocalStorage("cart", filterCartProduct);
  if (filterCartProduct.length === 0) {
    local && localStorage.removeItem("cart");
    dispatch(UPDATE_PRODUCTS_IN_CART(null));
    return;
  }
  dispatch(UPDATE_PRODUCTS_IN_CART(filterCartProduct));
};

export default deleteCartProductFromLocal;
