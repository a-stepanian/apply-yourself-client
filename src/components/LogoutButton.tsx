import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext.tsx";

export const LogoutButton = () => {
  const { setLoggedIn, url } = useAuthContext();
  const navigate = useNavigate();
  const logoutUser = async () => {
    await fetch(`${url}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).catch(error => {
      console.log(error);
      return;
    });
    setLoggedIn(false);
    navigate("/login");
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
