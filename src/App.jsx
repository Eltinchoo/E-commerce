import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import MyNavbar from "./components/MyNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Purchases from "./pages/Purchases";
import { useDispatch, useSelector } from "react-redux";
import { getNewProductsThunk } from "./store/slices/newProducts.slice";
//import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Container } from "react-bootstrap";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getNewProductsThunk()), []);
  return (
    <HashRouter>
      <MyNavbar />
      {isLoading && <LoadingScreen />}
      <Container className="mt-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
