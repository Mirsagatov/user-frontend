import { NavLink, Redirect, useHistory } from "react-router-dom";
import React, { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

//Modal Components
import Modal from "../Modal/Modal";
import LoginForm from "../Login/Login";

import "./Navbar.scss";
//Logo
import Ifood from "../../Assets/Images/Ifood.png";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  //Register
  const [show, setShow] = useState(false);

  const history = useHistory();
  const [checkToken, setChecktoken] = useState();
  const [active, setActive] = useState();
  const token = localStorage.getItem("auth_token");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const user_name = useRef(null);
  const user_email = useRef(null);
  const user_password = useRef(null);

  function getElements() {
    const name = user_name.current.value;
    const email = user_email.current.value;
    const password = user_password.current.value;

    setUser({
      name: name,
      email: email,
      password: password,
    });
  }

  const REGISTER = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password)
    }
  `;

  const [registeredUser] = useMutation(REGISTER, {
    onCompleted: ({ register }) => {
      if (
        register ===
          "We already have user with this email. Please, write another one" ||
        register ===
          "We already have user with this password. Please, write another one"
      ) {
        setActive("active");
      } else {
        const token = register;
        setChecktoken(token);
        localStorage.setItem("auth_token", token);
        history.push("/");
      }
    },
  });

  const RegisterFunc = async (evt) => {
    evt.preventDefault();

    await registeredUser({
      variables: user,
    });
  };

  //Log in
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState();
  const [existToken, setExistToken] = useState();
  const authToken = localStorage.getItem("auth_token");

  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });

  const LOGIN = gql`
    mutation login($name: String!, $password: String!) {
      login(name: $name, password: $password)
    }
  `;
  const [loginUser] = useMutation(LOGIN, {
    variables: {
      name: formState.name,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      if (
        login === "Incorrect password and name" ||
        login === "Inorrect password" ||
        login === "Incorrect name"
      ) {
        setWarning("active");
      } else {
        const authToken = login;
        setExistToken(authToken);
        localStorage.setItem("auth_token", authToken);
        history.push("/");
      }
    },
  });

  const LoginFunc = async (e) => {
    e.preventDefault();

    await loginUser({
      variables: loginUser,
    });
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo-link">
        <img src={Ifood} alt="navbar-logo-img" className="navbar-logo-img" />
      </NavLink>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/basket" className="basket-link">
            <FaShoppingCart className="basket" />
            <span className="basket-count">
              <h3>1</h3>
            </span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <button className="register" onClick={() => setShow(true)}>
            Register
          </button>

          {checkToken || token ? (
            <Redirect to="/" />
          ) : (
            <Modal
              title="Register Form"
              onClose={() => setShow(false)}
              show={show}
            >
              <form
                method="post"
                className="register-form"
                onSubmit={RegisterFunc}
              >
                <label for="name" className="name-label">
                  Name
                </label>
                <input
                  ref={user_name}
                  type="name"
                  name="name"
                  className="name"
                  placeholder="write your name"
                  onChange={getElements}
                  required
                />
                <label for="email" className="email-label">
                  Email
                </label>
                <input
                  ref={user_email}
                  type="email"
                  name="name"
                  className="email"
                  placeholder="write your email"
                  onChange={getElements}
                  required
                />
                <label for="password" className="password-label">
                  Password
                </label>
                <input
                  ref={user_password}
                  type="password"
                  name="password"
                  className="password"
                  placeholder="write your password"
                  onChange={getElements}
                  required
                />
                <div
                  style={{ margin: "0", color: "red" }}
                  className={`not_active ${active ? "active" : ""}`}
                >
                  Please try again
                </div>
                <button type="submit" className="register-btn">
                  Register
                </button>
              </form>
            </Modal>
          )}
        </li>
        <li className="navbar-item">
          <button className="login" onClick={() => setOpen(true)}>
            Log in
          </button>
          {existToken || authToken ? (
            <Redirect to="/" />
          ) : (
            <LoginForm
              title="Login Form"
              onClose={() => setOpen(false)}
              show={open}
            >
              <form className="login-form" onSubmit={LoginFunc}>
                <label for="name" className="name-label">
                  Name
                </label>
                <input
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      name: e.target.value,
                    });
                  }}
                  type="name"
                  name="name"
                  className="name"
                  placeholder="write your name"
                  required
                />
                <label for="password" className="password-label">
                  Password
                </label>
                <input
                  value={formState.password}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      password: e.target.value,
                    });
                  }}
                  type="password"
                  name="password"
                  className="password"
                  placeholder="write your password"
                  required
                />

                <div
                  style={{ margin: "0 auto 10px auto", color: "red" }}
                  className={`not_active ${warning ? "active" : ""}`}
                >
                  Please try again
                </div>

                <button type="submit" className="login-btn">
                  Log in
                </button>
              </form>
            </LoginForm>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
