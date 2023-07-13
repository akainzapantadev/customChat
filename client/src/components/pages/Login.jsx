// imports
import React from "react";
import { Navigate } from "react-router-dom";
import { Session } from "../index";
import { Container, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { global } from "../../global/Variables";

function Login() {
  let sessionRef = React.useRef();
  sessionRef = Session();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleLogin = (e) => {
    // console.log("login clicked");
    e.preventDefault();
    if (emailRef.current.value !== "" && passwordRef.current.value) {
      axios
        .post(`${global.link}/api/loginUser`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then(function (response) {
          // console.log(response.data.access);
          retrieveUserDetails(response.data.access);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Please try again");
    }
  };

  const retrieveUserDetails = (token) => {
    fetch(global.link + "/api/userDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to chichat!",
          }).then(function () {
            window.location.reload();
          });

          var currentDate = new Date();
          var expires = currentDate.setHours(currentDate.getHours() + 24);
          var logSession = {
            session: 1,
            expiresAt: expires,
            user: {
              id: data._id,
              token: token,
              email: data.email,
              isAdmin: data.isAdmin,
            },
          };
          localStorage.setItem("logSession", JSON.stringify(logSession));
        } else {
          Swal.fire({
            title: "Login Failed",
            icon: "error",
            text: "Please contact admin for this issue!",
          });
        }
      });
  };

  return sessionRef.session === 1 ? (
    <Navigate to="/chatpage" />
  ) : (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button className="mt-2" variant="dark" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
