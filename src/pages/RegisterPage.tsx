import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LineDesign } from "../components/LineDesign";
import { url, useAppContext } from "../context/AppContext";
// @ts-ignore
import styled from "styled-components";
interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  passwordVerify: string;
}

interface IPasswordError {
  isError: boolean;
  msg: string;
}
interface IPasswordError {
  isError: boolean;
  msg: string;
}

export const RegisterPage = () => {
  const [form, setForm] = useState<IRegistrationForm>({
    username: "",
    email: "",
    password: "",
    passwordVerify: ""
  });
  const initialErrorState = { isError: false, msg: "" };
  const [passwordError, setPasswordError] = useState<IPasswordError>(initialErrorState);
  const [fieldsRequiredError, setFieldsRequiredError] = useState<IPasswordError>(initialErrorState);
  const [serverError, setServerError] = useState<IPasswordError>(initialErrorState);

  const navigate = useNavigate();
  const { loggedIn, getLoggedIn, isDropdownOpen, toggleDropdown } = useAppContext();

  useEffect(() => {
    if (loggedIn) {
      // Redirect user to dashboard page
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  // setForm state when form input values are changed
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setForm(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Form validation user feedback
  useEffect(() => {
    setServerError({ isError: false, msg: "" });
    setPasswordError({ isError: false, msg: "" });
    setFieldsRequiredError({ isError: false, msg: "" });
    if (!form.username || !form.email || !form.password || !form.passwordVerify) {
      setFieldsRequiredError({ isError: true, msg: "Please fill out all fields" });
      return;
    }
    if (form.password.length < 6) {
      setPasswordError({
        isError: true,
        msg: "Password must contain at least 6 characters"
      });
    } else if (form.password !== form.passwordVerify) {
      setPasswordError({ isError: true, msg: "Passwords do not match" });
    }
  }, [form]);

  // This function handles the form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
      passwordVerify: form.passwordVerify
    };

    // send post request to server
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
      if (data) setServerError({ isError: true, msg: data.errorMessage });
    }

    // verify token and set state to logged in
    await getLoggedIn();
  };

  useEffect(() => {
    if (loggedIn) {
      setServerError({ isError: false, msg: "" });
      setPasswordError({ isError: false, msg: "" });
      setFieldsRequiredError({ isError: false, msg: "" });

      // clear form
      setForm({
        username: "",
        email: "",
        password: "",
        passwordVerify: ""
      });

      // Close mobile dropdown menu
      if (isDropdownOpen) toggleDropdown();

      // Redirect user to applications page
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <Wrapper>
      <section className="form-section">
        <div className="image-wrapper">
          <img src="newaccount.svg" alt="Ambitious job seeker creating a new Apply Yourself account." />
        </div>
        <div className="image-wrapper">
          <img src="newaccount2.svg" alt="Ambitious job seeker creating a new Apply Yourself account." />
        </div>
        {/* <LineDesign /> */}
        <h4>Create An Account</h4>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-input">
            {fieldsRequiredError.isError && <p className="form-error">{fieldsRequiredError.msg}</p>}
            {passwordError.isError && <p className="pwd-error">{passwordError.msg}</p>}
            {serverError.isError && <p className="server-error">{serverError.msg}</p>}
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
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={e => updateForm(e)}
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
              name="passwordVerify"
              value={form.passwordVerify}
              onChange={e => updateForm(e)}
            />
          </div>
          <div className="login-wrapper">
            <p>
              Already have an account?
              <Link to="/login" className="login">
                Log In
              </Link>
            </p>
          </div>
          <button type="submit">Create Account</button>
        </form>
      </section>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.main`
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
  form {
    z-index: 1;
    background-color: #fafafa;
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
      top: 1.5rem;
    }
    .pwd-error {
      position: absolute;
      width: 15rem;
      text-align: center;
      color: red;

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
    .login-wrapper {
      position: relative;
      z-index: 1;
      margin-bottom: 1rem;
      p {
        font-size: 0.8rem;
        font-weight: 900;
      }
      .login {
        margin-left: 0.5rem;
      }
    }
    button {
      color: black;
      width: 100%;
      margin-bottom: 1rem;
      padding: 1rem;
      border: 2px solid rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      background-color: rgba(215, 210, 255, 0.5);
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
    form {
      max-width: 30rem;
      padding: 4rem;
      margin: 1rem 1rem 8rem;
    }
    .form-section {
      .image-wrapper {
        &:nth-of-type(1) {
          animation: fadeUpLeft 1s forwards;
          top: calc(50% - 5rem);
          width: calc(60% - 7rem);
          left: 0;
        }
        &:nth-of-type(2) {
          animation: fadeUpRight 1s forwards;
          top: calc(50% - 10rem);
          width: calc(60% - 5rem);
          right: 0;
        }
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
    @keyframes fadeUpRight {
      0% {
        opacity: 0.04;
        transform: translateX(0) scale(0.5);
      }
      100% {
        opacity: 0.3;
        transform: translateX(80px) scale(0.8);
      }
    }
  }
`;
