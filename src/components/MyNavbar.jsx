import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import CartSideBar from "./CartSideBar";

const MyNavBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" variant="primary" expand="lg">
        <Container className="nav-bar">
          <Navbar.Brand
            href="#home"
            to="/"
            as={Link}
            style={{ color: "white", fontSize: "20px" }}
          >
            <i className="fa-solid fa-meteor"></i> MeteorStore
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Nav.Link href="#login" to="/login" as={Link}>
                <i className="fa-solid fa-user"></i> User
                
              </Nav.Link>
              
              <Nav.Link href="#purchases" to="/purchases" as={Link}>
                <i className="fa-solid fa-store" ></i> Purchases
              </Nav.Link>
             
              <Nav.Link onClick={handleShow}>
              <i className="fa-solid fa-bag-shopping"  ></i>
               Your Cart
              </Nav.Link>
              
              <Nav.Link onClick={logOut}>
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSideBar show={show} handleClose={handleClose} />
    </>
  );
};

export default MyNavBar;
