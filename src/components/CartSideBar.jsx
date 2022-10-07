import React, { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartThunk, purchaseCartThunk, removeProductInCartThunk } from "../store/slices/cart.slice";

const CartSideBar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  useEffect(() => {
    let newTotal = 0;
    cart.forEach(product => {
      newTotal += +product.price * product.productsInCart.quantity;
    })
    setTotal(newTotal);
  }, [cart])

   const removeProduct = (data) => {
    dispatch(removeProductInCartThunk(data.id))
  }

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h2>This is your cart!</h2>
          <ListGroup>
            {cart.map((item) => (
              <ListGroupItem key={item.id}>
                <Link
                  className="side-bar-items"
                  to={`/product-detail/${item.id}`}
                >
                  <h2
                    className="title-product-in-side-bar"
                    style={{ color: "black" }}
                  >
                    {item.title}
                  </h2>
                  <br />
                </Link>
                Price: <b className="price-in-side-bar"> ${item.price}</b>
                <br />
                <i onClick={() => removeProduct(item)} className="fa-solid fa-trash-can"></i>
              </ListGroupItem>
            ))}
          </ListGroup>
          <b>Total: {total}</b>
          <br />
          <Button
            onClick={() => dispatch(purchaseCartThunk())}
            variant="success"
          >
            Checkout <i className="fa-solid fa-circle-check"></i>
          </Button>{" "}
        </Offcanvas.Body>
        
      </Offcanvas>
     
    </>
  );
};

export default CartSideBar;
