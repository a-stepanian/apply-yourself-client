import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import { LuAlertTriangle } from "react-icons/lu";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { Button } from "../components/Button";
import { IFormErrors } from "./RegisterPage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { TypingEffect } from "../components/TypingEffect";

interface ILoginForm {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const [form, setForm] = useState<ILoginForm>({
    username: "",
    password: ""
  });
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({
    showError: true,
    errorMessages: ["All fields are requried"]
  });

  const { loggedIn, getLoggedIn, user } = useAppContext();

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({ showError: false, errorMessages: [] });
    setForm(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: e ? form.username : "test123",
          password: e ? form.password : "test123"
        }),
        credentials: "include"
      });
      if (response.ok) {
        const res = getLoggedIn();
      } else {
        const data = await response.json();
        if (data?.errorMessage) {
          setFormErrors({ showError: true, errorMessages: [data.errorMessage] });
        }
      }
    } catch (error) {
      setFormErrors({ showError: true, errorMessages: ["Network Error"] });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const startDemo = () => {
    let demoUsername = "test123";
    let demoPassword = "test123";
    setForm({ username: "", password: "" });
    for (let i = 0; i < demoUsername.length; i++) {
      setTimeout(() => {
        setForm(prev => {
          return {
            ...prev,
            username: prev.username + demoUsername[i]
          };
        });
      }, 80 * i + 200);
    }
    for (let i = 0; i < demoPassword.length; i++) {
      setTimeout(() => {
        setForm(prev => {
          return {
            ...prev,
            password: prev.password + demoPassword[i]
          };
        });
      }, 80 * i + 1000);
    }
    setFormErrors({ showError: false, errorMessages: [] });
    setTimeout(() => {
      handleSubmit();
    }, 1800);
  };

  return (
    <Wrapper>
      <svg
        className="blue-blob"
        id="10015.io"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <path fill="#3a5eff" d="M297,341Q123,442,127,246.5Q131,51,301,145.5Q471,240,297,341Z" />
      </svg>
      {loggedIn && !isLoading ? (
        <div className="logged-in-message">
          <TypingEffect
            text={`Welcome back${user?.username ? `, ${user.username}!` : "!"}`}
            speedInMilliseconds={30}
            textElementType="h2"
          />
          <Link to={"/dashboard"} className="view-dashboard">
            View Dashboard <FaArrowRight />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Sign In</h4>
          <button type="button" onClick={startDemo}>
            demo
          </button>
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
            disabled={isLoading || formErrors.showError}
            type="submit"
            size="xs"
            variant="primary"
            clickHandler={handleSubmit}
            className="submit-button">
            {isLoading ? <LoadingSpinner /> : "Submit"}
          </Button>
          <p className="login-wrapper">
            Don't have an account?
            <Link to="/register" className="login">
              Sign Up
            </Link>
          </p>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .blue-blob {
    display: none;
  }
  .logged-in-message {
    font-family: ${({ theme }) => theme.primaryFont};
    text-align: center;
    margin-top: ${({ theme }) => (theme.name === "darkMode" ? "10rem" : "10.4rem")};
    .view-dashboard {
      font-weight: ${({ theme }) => (theme.name === "darkMode" ? 500 : 900)};
      font-size: ${({ theme }) => (theme.name === "darkMode" ? "2rem" : "2.3rem")};
      display: block;
      color: ${({ theme }) => theme.primaryPink};
      margin-top: ${({ theme }) => (theme.name === "darkMode" ? "1rem" : "1.4rem")};
      svg {
        font-size: 1.2rem;
      }
    }
  }
  form {
    font-family: "Poppins", sans-serif;
    border-radius: 3px;
    position: relative;
    width: 100%;
    padding: 0 2rem 10rem;
    background: ${({ theme }) => (theme.name === "darkMode" ? "#333" : "#fefefe")};
    color: ${({ theme }) => (theme.name === "darkMode" ? "#efefef" : "##222")};
    transition: 0.4s linear;
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
        color: ${({ theme }) => theme.primaryBlue};
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
      margin: 2rem 0;
      cursor: pointer;
      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
  .image-wrapper {
    display: none;
  }

  @media (min-width: 480px) {
    form {
      max-width: 380px;
      margin: 6rem 0 12rem;
      padding: 0 3rem 2rem;
      box-shadow: ${({ theme }) => (theme.name === "darkMode" ? "none" : "5px 5px 5px rgba(0, 0, 0, 0.3)")};
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "32px")};
    }
  }
  @media (min-width: 768px) {
    .blue-blob {
      display: block;
      top: -350px;
      position: absolute;
      width: 1400px;
      z-index: -1;
      opacity: ${({ theme }) => (theme.name === "darkMode" ? 0.2 : 0.1)};
    }
    form {
      margin: 8rem 0 12rem;
    }
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
