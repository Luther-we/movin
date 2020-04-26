import React, { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { login } from "../utils/auth/authHelperMethods";
import { useTheme } from "../utils/theme/ThemeProvider";
import {useHistory} from "react-router-dom"


const Login = (props) => {
  console.log(".???.??.?? ")
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false)

  const [themeState] = useState(useTheme());

  const handleSubmit = (e) => {
    console.log('fucking')
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    console.log('===>', form.checkValidity())
    if (form.checkValidity()) {
      const promise1 = new Promise((res, rej) =>
        login({ email, password, res, rej })
      );
      promise1
        .then((a) => history.push("/home"))
        .catch((e) => new Error("erreur handleSubmit !"));
    }
    setValidated(true)
  };

  const handleChange = (e) => {
    const inputName = e.target.type;
    if (inputName === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const isDarkRefrence = () => {
    return themeState.dark ? "light" : "dark";
  };

  return (
    <>
    <Form noValidate validated={validated} onSubmit={(e, a) => handleSubmit(e, a)} as={Container} style={{paddingTop: '25%'}} >
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
      
      
      <Button type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};

export default Login;
