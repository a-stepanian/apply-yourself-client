import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogoutButton = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutUser = async () => {
    // const url = "https://server-apply-yourself.herokuapp.com/auth/logout";
    const url = "http://localhost:5000/auth/logout";
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
      LOGOUT <RiLogoutBoxRLine />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 12rem;
  border: none;
  border: 1px solid red;
`;

export default LogoutButton;
