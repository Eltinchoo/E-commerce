import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const newProductsSlice = createSlice({
  name: "newProducts",
  initialState: [],
  reducers: {
    setNewProducts: (state, action) => {
      const newProducts = action.payload;
      return newProducts;
    },
  },
});

export const getNewProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setNewProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setNewProducts } = newProductsSlice.actions;

export default newProductsSlice.reducer;
