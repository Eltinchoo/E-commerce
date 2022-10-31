import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { addCartThunk } from "../store/slices/cart.slice";

const Home = () => {
  const newProducts = useSelector((state) => state.newProducts);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newFiltered, setNewFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setNewFiltered(newProducts);
  }, [newProducts]);

  const filterCategory = (categoryId) => {
    const filtered = newProducts.filter(
      (product) => product.category.id === categoryId
    );
    setNewFiltered(filtered);
  };

  const searchProduct = () => {
    const filteredProduct = newProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setNewFiltered(filteredProduct);
  };

  const addProductToCart = (id) => {
    const cartItem = {
      id: id,
      quantity: 1,
    };
    dispatch(addCartThunk(cartItem));
  };
  return (
    <Row className="container-gral">
      <Col lg={2}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Product"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            onClick={searchProduct}
            variant="outline-secondary"
            id="button-addon2"
          >
            <i className="fa-brands fa-sistrix"></i>
          </Button>
        </InputGroup>

        <ListGroup>
          {categories.map((category) => (
            <ListGroup.Item
              onClick={() => filterCategory(category.id)}
              className="btn btn-primary btn-categories"
              style={{ color: "rgb(8, 46, 34)" }}
              key={category.id}
            >
              {category.name}
            </ListGroup.Item>
          ))}
          <></>
        </ListGroup>
      </Col>

      <Col>
        <div className="products-container">
          <ul>
            {newFiltered.map((newProduct) => (
              <li className="product-card-home" key={newProduct.id}>
                <img
                  onClick={() => navigate(`/product-detail/${newProduct.id}`)}
                  className="product-img"
                  src={newProduct.productImgs}
                  alt=""
                />
                <hr />
                <h3
                  onClick={() => navigate(`/product-detail/${newProduct.id}`)}
                  className="name-product-card-home"
                >
                  {newProduct.title}
                </h3>

                <div className="price-container-home">
                  <h5 className="price-card-home">
                    Price: $<span>{newProduct.price}</span>
                  </h5>
                  <i
                    onClick={() => addProductToCart(newProduct.id)}
                    className="fa-solid fa-cart-plus"
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Home;
