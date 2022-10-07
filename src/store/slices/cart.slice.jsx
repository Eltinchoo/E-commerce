import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;
      return cart;
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .catch((error) => console.log(error.response))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (cart) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      cart,
      getConfig()
    )
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchaseCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      {},
      getConfig()
    )
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const removeProductInCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete('https://ecommerce-api-react.herokuapp.com/api/v1/cart/'+id, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
