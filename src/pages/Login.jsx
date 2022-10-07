import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token)
        navigate("/")
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("credenciales invalidas");
        }
        console.log(error.response);
      });
  };

  return (
    <div  className="user-login">
      
      <h2>Hello! Please log in</h2>
      <Form
      className="form-login"
        onSubmit={handleSubmit(submit)}
        style={{
        marginTop:"60px",
          border: "1px  solid    rgb(22, 175, 147)",
          borderRadius: "10px",
          marginRight: "50px",
          marginLeft: "50px",
          padding: "20px  60px"
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><i className="fa-solid fa-envelope"></i> Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><i className="fa-solid fa-lock"></i> Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Login;
