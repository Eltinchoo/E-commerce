import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesThunk } from "../store/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);
console.log(purchases);
  return (
    <div>
      <h2>My purchases</h2>
      <ListGroup key={purchases[0]?.id}>
        {purchases.map((purchase) => (
          <ListGroup.Item key={purchase.cart?.id}>
            {purchase?.cart.products.map((item) => (
              <div key={item.id}>
                <h5 onClick={() => navigate(`/product-detail/${item.id}`)}>
                  * {item.title}
                </h5>
                Price: $<b>{item.price}</b>
                <br />
              </div>
            ))}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Purchases;
