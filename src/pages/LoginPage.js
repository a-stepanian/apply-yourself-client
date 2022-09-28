import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";

const LoginPage = ({ isDropdownOpen, toggleDropdown }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loggedIn, getLoggedIn, url } = useContext(AuthContext);

  // Set form state when input values change
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // This function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {
      username: form.username,
      password: form.password,
    };
    // send post request to server
    await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
      credentials: "include",
    }).catch((error) => {
      console.log(error);
      return;
    });

    // check token
    await getLoggedIn();

    // clear form
    setForm({
      username: "",
      password: "",
    });

    // close mobile dropdown menu
    if (isDropdownOpen) toggleDropdown();
  };

  // redirect user upon successful login
  useEffect(() => {
    if (loggedIn) navigate("/applications");
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <Wrapper>
      <LineDesign />
      <section className="form-section">
        <div className="image-wrapper">
          <img
            src="login.svg"
            alt="Ambitious job seeker creating a new Apply Yourself account."
          />
        </div>
        <div className="image-wrapper">
          <img
            src="login2.svg"
            alt="Ambitious job seeker creating a new Apply Yourself account."
          />
        </div>
        <h4>Log In To Your Account</h4>
        <div className="register-wrapper">
          <p>
            Don't have an account?
            <Link to="/register" className="register">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              value={form.username}
              onChange={(e) => updateForm({ username: e.target.value })}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: relative;
  height: 60rem;
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
    .image-wrapper:nth-of-type(1) {
      display: block;
      position: absolute;
      top: 42rem;
      opacity: 0.4;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: center;
      img {
        padding-right: 2rem;
        width: 100%;
        max-width: 20rem;
      }
    }
    .image-wrapper:nth-of-type(2) {
      display: none;
    }
  }
  h4 {
    z-index: 1;
    width: 20rem;
    position: relative;
    margin: 5rem 1rem 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    text-align: center;
  }
  .register-wrapper {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    margin-bottom: 2rem;
    p {
      font-size: 0.8rem;
      font-weight: 900;
    }
    .register {
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
    padding: 2rem;
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
      margin: 1rem 0;
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
    height: 45rem;

    .form-section {
      .image-wrapper {
        &:nth-of-type(1) {
          top: calc(50% + 5rem);
          opacity: 0.4;
          width: calc(40% - 7rem);
          left: 0;
          img {
            max-width: 100%;
          }
        }
        &:nth-of-type(2) {
          display: block;
          position: absolute;
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
          opacity: 0.05;
          width: calc(60% - 7rem);
          left: 0;
        }
        &:nth-of-type(2) {
          top: calc(50% - 10rem);
          opacity: 0.2;
          width: calc(60% - 5rem);
          right: 0;
        }
      }
    }
  }
`;

export default LoginPage;
