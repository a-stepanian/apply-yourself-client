import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";

const RegisterPage = ({ isDropdownOpen, toggleDropdown }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordVerify: "",
  });
  const [pwdError, setPwdError] = useState({ isError: false, msg: "" });
  const [fieldsReqError, setFieldsReqError] = useState({
    isError: false,
    msg: "",
  });
  const [serverError, setServerError] = useState({
    isError: false,
    msg: "",
  });
  const navigate = useNavigate();
  const { loggedIn, getLoggedIn, url } = useContext(AuthContext);

  // setForm state when form input values are changed
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // Form validation user feedback
  useEffect(() => {
    setServerError({ isError: false, msg: "" });
    setPwdError({ isError: false, msg: "" });
    setFieldsReqError({ isError: false, msg: "" });
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.passwordVerify
    ) {
      setFieldsReqError({ isError: true, msg: "Please fill out all fields" });
      return;
    }
    if (form.password.length < 6) {
      setPwdError({
        isError: true,
        msg: "Password must contain at least 6 characters",
      });
    } else if (form.password !== form.passwordVerify) {
      setPwdError({ isError: true, msg: "Passwords do not match" });
    }
  }, [form]);

  // This function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
      passwordVerify: form.passwordVerify,
    };

    // send post request to server
    const response = await fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
      credentials: "include",
    }).catch((error) => {
      console.log("error from server: ", error);
      return;
    });

    if (response.status !== 200) {
      const data = await response.json();
      if (data) setServerError({ isError: true, msg: data.errorMessage });
    }

    // verify token and set state to logged in
    await getLoggedIn();
  };

  useEffect(() => {
    if (loggedIn) {
      setServerError({ isError: false, msg: "" });
      setPwdError({ isError: false, msg: "" });
      setFieldsReqError({ isError: false, msg: "" });

      // clear form
      setForm({
        username: "",
        email: "",
        password: "",
        passwordVerify: "",
      });

      // Close mobile dropdown menu
      if (isDropdownOpen) toggleDropdown();

      // Redirect user to applications page
      navigate("/applications");
    }
    // eslint-disable-next-line
  }, [loggedIn]);
  useEffect(() => {
    if (loggedIn) {
      // Redirect user to applications page
      navigate("/applications");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <section className="form-section">
        <div className="image-wrapper">
          <img
            src="newaccount.svg"
            alt="Ambitious job seeker creating a new Apply Yourself account."
          />
        </div>
        <div className="image-wrapper">
          <img
            src="newaccount2.svg"
            alt="Ambitious job seeker creating a new Apply Yourself account."
          />
        </div>
        <LineDesign />
        <h4>Create An Account</h4>
        <div className="login-wrapper">
          <p>
            Already have an account?
            <Link to="/login" className="login">
              Log In
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            {fieldsReqError.isError && (
              <p className="form-error">{fieldsReqError.msg}</p>
            )}
            {pwdError.isError && <p className="pwd-error">{pwdError.msg}</p>}
            {serverError.isError && (
              <p className="server-error">{serverError.msg}</p>
            )}
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              autoComplete="off"
              required
              type="text"
              id="username"
              value={form.username}
              onChange={(e) => updateForm({ username: e.target.value })}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="off"
              required
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              autoComplete="off"
              required
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="passwordVerify">
              Confirm Password
            </label>
            <input
              required
              autoComplete="off"
              type="password"
              id="passwordVerify"
              value={form.passwordVerify}
              onChange={(e) => updateForm({ passwordVerify: e.target.value })}
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .form-section {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .image-wrapper {
      display: none;
    }
  }
  h4 {
    z-index: 1;
    position: relative;
    margin: 5rem 1rem 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    text-align: center;
  }
  .login-wrapper {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    margin-bottom: 2rem;
    p {
      font-size: 0.8rem;
      font-weight: 900;
    }
    .login {
      margin-left: 0.5rem;
    }
  }
  form {
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);
    border-radius: 3px;
    position: relative;
    width: 100%;
    max-width: 20rem;
    margin: 1rem 1rem 5rem;
    padding: 3rem 2rem;
    .form-error,
    .server-error {
      position: absolute;
      width: 15rem;
      text-align: center;
      color: red;
      font-family: "Josefin Slab", serif;
      top: 1.5rem;
    }
    .pwd-error {
      position: absolute;
      width: 15rem;
      text-align: center;
      color: red;
      font-family: "Josefin Slab", serif;
      top: 19.5rem;
    }
    .form-input {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      input {
        padding: 0.4rem;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 1px;
      }
    }
    .label {
      font-weight: 500;
    }
    button {
      color: black;
      width: 100%;
      margin: 3rem 0 1rem;
      padding: 1rem;
      border: 2px solid rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      background-color: rgba(215, 210, 255, 0.5);
      font-family: "Playfair Display", serif;
      font-weight: 700;
      font-size: 1.1rem;
      &:hover {
        cursor: pointer;
        background-color: rgba(215, 210, 255, 1);
      }
    }
  }

  @media (min-width: 768px) {
    .form-section {
      .image-wrapper {
        display: block;
        position: absolute;
        &:nth-of-type(1) {
          top: calc(50% + 5rem);
          opacity: 0.5;
          width: calc(40% - 7rem);
          left: 0;
        }
        &:nth-of-type(2) {
          top: calc(50% - 5rem);
          opacity: 0.6;
          width: calc(40% - 5rem);
          right: 0;
        }
        img {
          width: 100%;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .form-section {
      .image-wrapper {
        &:nth-of-type(1) {
          top: calc(50% - 5rem);
          opacity: 0.2;
          width: calc(60% - 7rem);
          left: 0;
        }
        &:nth-of-type(2) {
          top: calc(50% - 10rem);
          opacity: 0.3;
          width: calc(60% - 5rem);
          right: 0;
        }
      }
    }
  }
`;

export default RegisterPage;
