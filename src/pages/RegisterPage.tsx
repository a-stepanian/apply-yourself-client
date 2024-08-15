import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { url, useAppContext } from "../context/AppContext";
import styled from "styled-components";
import { LuAlertTriangle } from "react-icons/lu";
import { Button } from "../components/Button";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  passwordVerify: string;
}

export interface IFormErrors {
  showError: boolean;
  errorMessages: string[];
}

export const RegisterPage = () => {
  const [form, setForm] = useState<IRegistrationForm>({
    username: "",
    email: "",
    password: "",
    passwordVerify: ""
  });
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({ showError: false, errorMessages: [] });

  const navigate = useNavigate();

  const { loggedIn, getLoggedIn, isDropdownOpen, toggleDropdown } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      setFormErrors({ showError: false, errorMessages: [] });
      setForm({
        username: "",
        email: "",
        password: "",
        passwordVerify: ""
      });
      if (isDropdownOpen) toggleDropdown();
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    let errors = [];
    if (form.password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    } else if (form.password !== form.passwordVerify) {
      errors.push("Passwords do not match.");
    }
    if (!form.username || !form.email || !form.password || !form.passwordVerify) {
      errors.push("All fields are required.");
    }
    setFormErrors({
      showError: errors.length > 0,
      errorMessages: errors
    });
  }, [form]);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setForm(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
      passwordVerify: form.passwordVerify
    };

    const response = await fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser),
      credentials: "include"
    }).catch(error => {
      console.log("error from server: ", error);
      return;
    });

    if (response?.status !== 200) {
      const data = await response?.json();
      if (data) {
        setFormErrors({ showError: true, errorMessages: [data.errorMessage] });
      }
    }

    // verify token and set state to logged in
    await getLoggedIn();
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h4>Sign Up</h4>
        <div className="form-input">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            autoComplete="off"
            required
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={e => updateForm(e)}
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
            name="email"
            value={form.email}
            onChange={e => updateForm(e)}
          />
        </div>
        <div className="form-input">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="off"
            required
            type={showPwd ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={e => updateForm(e)}
          />
          <button type="button" onClick={() => setShowPwd(prev => !prev)} className="eye-button">
            {showPwd ? <PiEyeClosed /> : <PiEye />}
          </button>
        </div>
        <div className="form-input">
          <label className="label" htmlFor="passwordVerify">
            Confirm Password
          </label>
          <input
            required
            autoComplete="off"
            type={showPwd ? "text" : "password"}
            id="passwordVerify"
            name="passwordVerify"
            value={form.passwordVerify}
            onChange={e => updateForm(e)}
          />
          <button type="button" onClick={() => setShowPwd(prev => !prev)} className="eye-button">
            {showPwd ? <PiEyeClosed /> : <PiEye />}
          </button>
        </div>
        {formErrors.showError && formErrors.errorMessages.length > 0 && (
          <div className="form-error">
            <LuAlertTriangle className="alert-icon" />
            <div>
              {formErrors.errorMessages.map(x => (
                <p key={x} className="error-message">
                  {x}
                </p>
              ))}
            </div>
          </div>
        )}
        <Button
          disabled={formErrors.showError}
          type="submit"
          size="xs"
          variant="primary"
          clickHandler={handleSubmit}
          className="submit-button">
          Submit
        </Button>
        <p className="login-wrapper">
          Already have an account?
          <Link to="/login" className="login">
            Log In
          </Link>
        </p>
      </form>
      {/* <div className="image-wrapper">
        <img src="newaccount.svg" alt="Ambitious job seeker creating a new Apply Yourself account." />
      </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    font-family: "Poppins", sans-serif;
    border-radius: 3px;
    position: relative;
    width: 100%;
    padding: 0 2rem 10rem;
    background: rgb(115 115 115 / 23%);
    h4 {
      font-family: ${({ theme }) => theme.primaryFont};
      font-weight: ${({ theme }) => (theme.name === "darkMode" ? 500 : 900)};
      font-size: 1.4rem;
      text-align: center;
      margin: 2rem;
    }
    .form-error {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 0, 89, 0.1);
      color: #dc002c;
      border: 1px solid #dc002c;
      border-radius: 3px;
      padding: 0.5rem 1rem;
      margin: 2rem 0;
      .alert-icon {
        width: 50px;
        font-size: 2rem;
        margin-right: 0.5rem;
      }
      .error-message {
        font-size: 0.8rem;
        margin-right: 2rem;
        margin-bottom: 0.4rem;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    .form-input {
      position: relative;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      .label {
        font-weight: 500;
      }
      input {
        padding: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 3px;
        background-color: rgba(134, 134, 134, 0.15);
        color: ${({ theme }) => (theme.name === "darkMode" ? "#eee" : "#222")};
      }
      .eye-button {
        position: absolute;
        right: 4px;
        bottom: 2px;
        background-color: transparent;
        color: ${({ theme }) => theme.color1};
        border: none;
        cursor: pointer;
        svg {
          font-size: 1.3rem;
        }
        &:hover {
        }
      }
    }
    .login-wrapper {
      font-family: ${({ theme }) => theme.primaryFont};
      font-weight: ${({ theme }) => (theme.name === "darkMode" ? 500 : 900)};
      font-size: 0.8rem;
      text-align: center;
      .login {
        margin-left: 0.5rem;
      }
    }
    .submit-button {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      background: rgb(192, 36, 255);
      font-size: 1.2rem;
      font-weight: ${({ theme }) => (theme.name === "darkMode" ? "700" : "900")};
      color: #111;
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "3rem")};
      transition: border-radius 0.4s linear, background-color 0.4s linear;
      margin-bottom: 1rem;
    }
  }
  .image-wrapper {
    display: none;
  }

  @media (min-width: 480px) {
    form {
      max-width: 380px;
      margin: 3rem 0 0;
      padding: 0 3rem 10rem;
    }
  }
  @media (min-width: 768px) {
    .image-wrapper {
      display: block;
      position: absolute;
      &:nth-of-type(1) {
        top: calc(50% + 5rem);
        opacity: 0.5;
        width: calc(40% - 7rem);
        left: 0;
      }
      img {
        width: 100%;
      }
    }
  }

  @media (min-width: 1200px) {
    .image-wrapper {
      animation: fadeUpLeft 1s forwards;
      top: calc(50% - 5rem);
      width: calc(60% - 7rem);
      left: 0;
    }
  }
  @keyframes fadeUpLeft {
    0% {
      opacity: 0.04;
      transform: translateX(0) scale(0.5);
    }
    100% {
      opacity: 0.3;
      transform: translateX(-80px) scale(0.8);
    }
  }
`;
