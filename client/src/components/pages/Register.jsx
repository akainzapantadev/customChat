import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { global } from "../../global/Variables";

function Register() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const nameRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(global.link + "/api/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Authentication Failed",
            icon: "error",
            text: "Email already exists.",
          });
        } else {
          fetch(global.link + "/api/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data) {
                Swal.fire({
                  title: "Registration Successful",
                  icon: "success",
                  text: "Welcome to chichat!",
                });
                setIsSuccess(true);
              } else {
                Swal.fire({
                  title: "Registration Failed",
                  icon: "error",
                  text: "Please contact admin for this issue!",
                });
              }
            });
        }
      });
  };

  return !isSuccess ? (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            ref={nameRef}
            placeholder="name"
            required
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            ref={emailRef}
            placeholder="email"
            required
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="password"
            required
          />
        </Form.Group>
        <Button variant="dark" className="mt-2" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default Register;
