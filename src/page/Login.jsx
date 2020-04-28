import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "../utils/auth/authHelperMethods";
import {useHistory} from "react-router-dom"


const Login = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
        login({ email, password })
        .then((a) => setTimeout(() => history.push("/home"), 1000))
        .catch((e) => new Error("erreur handleSubmit !"));
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.type;
    if (inputName === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <>
    <Form noValidate  onSubmit={handleSubmit}  style={{paddingTop: '25%'}} >
        {/* <Form.Row className="justify-content-center" > */}
          <Form.Group
            // as={Col}
            controlId="formBasicEmail"
            xs={8} md={8}
            >
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
        {/* </Form.Row> */}
      
        {/* <Form.Row className="justify-content-center"> */}
      <Form.Group controlId="formBasicPassword" xs={8} md={8}> 
        <Form.Control
          custom
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
                  <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
      </Form.Group>
      {/* </Form.Row> */}
      
      
      <Button type="submit" variant="outline-primary">
        Submit
      </Button>
    </Form>
    </>
  );
};

export default Login;
