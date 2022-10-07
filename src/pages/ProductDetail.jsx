import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { addCartThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams();
  
  const dispatch = useDispatch()
  
  const newProductList = useSelector((state) => state.newProducts);
  
  const [quantity, setQuantity] = useState(1)
  
  const newProductDetail = newProductList.find(
    (product) => product.id === Number(id)
  );
console.log(newProductDetail);
  const relatedProducts = newProductList.filter(
    (relatedProduct) =>
      relatedProduct.category.id === newProductDetail.category.id
  );

  useEffect(() => {
    setQuantity(1)
  }, [])
  
const addToCart = () => {
  const cart = {
    id: id,
    quantity: quantity
  }
  dispatch(addCartThunk(cart))
}

  return (
    <Row>
      <Col>
        <div className="product-detail-container">
          <div className="img-container-in-product-detail">
            <Carousel variant="dark">
              <Carousel.Item>
                <img
                  className="product-image-detail"
                  src={newProductDetail?.productImgs[0]}
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="product-image-detail"
                  src={newProductDetail?.productImgs[1]}
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="product-image-detail"
                  src={newProductDetail?.productImgs[2]}
                  alt=""
                />
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="full-description-in-product-detail">
            <h2 className="title-product">{newProductDetail?.title}</h2>
            <p className="description-article">
              {newProductDetail?.description}
            </p>
            <div className="price-qty-container">
            <h5>Price : ${newProductDetail?.price}</h5>
                <div className="quantity-btn-container">
                 <b>Quantity</b> 
            <div className="qty-container">
            <i 
            className="fa-solid fa-minus"
            onClick={() => setQuantity(quantity-1)}>
            </i> 
            
            {quantity}
            
            <i 
            className="fa-solid fa-plus"
            onClick={() => setQuantity(quantity+1)}>
            </i>
            </div>
            </div>
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary" onClick={addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Col>

      <Col lg={3}>
        <h2>Related Products</h2>
        <ListGroup as="ul">
        {relatedProducts.map((product) => (
          <Link className="related-product-title" key={product.id} to={`/product-detail/${product.id}`}>
            <ListGroup.Item as='li' >
              <img
                className="product-img-related"
                src={product.productImgs}
                alt=""
              />
              <br />
             <h6 className="product-title-related">{product.title}</h6> 
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      </Col>
    
    </Row>
  );
};

export default ProductDetail;
