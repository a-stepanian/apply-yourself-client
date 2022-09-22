import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LineDesign from "../components/LineDesign";

const RegisterPage = ({ isDropdownOpen, toggleDropdown }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordVerify: "",
  });
  const navigate = useNavigate();

  // url variable to send create new user POST request to
  //   const url = "https://server-apply-yourself.herokuapp.com/auth";
  const url = "http://localhost:5000/auth/";

  // setForm state when form input values are changed
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

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
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
      credentials: "same-origin",
    }).catch((error) => {
      console.log(error);
      return;
    });

    // clear form
    setForm({
      username: "",
      email: "",
      password: "",
      passwordVerify: "",
    });
    if (isDropdownOpen) toggleDropdown();
    navigate(`/`);
  };

  return (
    <Wrapper>
      <header className="img-container">
        <h2>REGISTER PAGE</h2>
      </header>
      <section>
        <LineDesign />
        <form onSubmit={handleSubmit}>
          <h4>Sign Up</h4>
          <div className="form-input">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
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
              type="text"
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
              type="text"
              id="passwordVerify"
              value={form.passwordVerify}
              onChange={(e) => updateForm({ passwordVerify: e.target.value })}
            />
          </div>
          <button type="submit">Create User</button>
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
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
  form {
    z-index: 1;
    position: relative;
    width: 100%;
    margin: 1rem;
    padding: 1rem;
    max-width: 30rem;
    h4 {
      margin: 3rem 0 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--beige2);
      font-weight: 500;
      font-size: 2rem;
      text-align: center;
    }
    .app-h4 {
      margin-top: 5rem;
    }
    .form-input,
    .date-input {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      input {
        padding: 0.4rem;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 1px;
      }
    }
    .date-input {
      margin-bottom: 1rem;
      input {
        background-color: white;
        padding: 0.2rem;
        width: 8.5rem;
        font-size: 1rem;
        font-family: "Playfair Display", serif;
      }
    }
    .date-and-status {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .label {
      font-weight: 700;
    }
    .radio-buttons {
      background-color: white;
      border: 1px solid rgba(0, 0, 0, 0.6);
      border-radius: 1px;
      padding: 0.3rem;
      display: flex;
      justify-content: space-around;
    }
    .button-wrapper {
      margin: 0 0.5rem;
    }
    textarea {
      border-radius: 2px;
      padding: 0.3rem;
    }
    button {
      color: black;
      width: 100%;
      margin: 4rem 0;
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

  @media (min-width: 480px) {
    form {
      .date-and-status {
        flex-direction: row;
      }
    }
  }
`;

export default RegisterPage;
