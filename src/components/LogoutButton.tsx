import React from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAppContext, url } from "../context/AppContext";

export const LogoutButton = () => {
  const { setLoggedIn } = useAppContext();
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;

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
