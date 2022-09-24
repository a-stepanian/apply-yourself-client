import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LineDesign from "../components/LineDesign";

const LoginPage = ({ isDropdownOpen, toggleDropdown }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  // Set form state when input values change
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  //   const url = "https://server-apply-yourself.herokuapp.com/auth/login";
  const url = "http://localhost:5000/auth/login";

  // This function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {
      username: form.username,
      password: form.password,
    };
    // send post request to server
    await fetch(url, {
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
      <section>
        <LineDesign />
        <h4>Log In To Your Account</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              autoComplete="false"
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
              autoComplete="false"
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  section {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h4 {
    margin: 5rem 1rem 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    text-align: center;
  }
  form {
    z-index: 1;
    position: relative;
    width: 100%;
    max-width: 16rem;
    margin: 1rem;
    padding: 2rem 0;
    border-top: 1px solid var(--beige2);
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
      margin: 2rem 0 6rem;
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
`;

export default LoginPage;
