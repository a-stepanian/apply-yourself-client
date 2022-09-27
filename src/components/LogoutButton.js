import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogoutButton = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutUser = async () => {
    const url = "https://server-apply-yourself.herokuapp.com/auth/logout";
    // const url = "http://localhost:5000/auth/logout";
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).catch((error) => {
      console.log(error);
      return;
    });
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <Wrapper onClick={logoutUser}>
      <span>Logout</span> <RiLogoutBoxRLine className="icon" />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: transparent;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Playfair Display", serif;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  span {
    margin-right: 0.5rem;
  }
  .icon {
    font-size: 1.2rem;
  }
  @media (min-width: 768px) {
    font-size: 0.8rem;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    span {
      margin-right: 0.5rem;
    }
    .icon {
      display: none;
    }
  }
`;

export default LogoutButton;
