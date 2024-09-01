import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAppContext, url } from "../context/AppContext";

export const LogoutButton = () => {
  const { setLoggedIn, toggleDropdown } = useAppContext();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await fetch(`${url}/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      setLoggedIn(false);
      navigate("/login");
      toggleDropdown();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper onClick={logoutUser}>
      <span>Logout</span> <RiLogoutBoxRLine className="icon" />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: transparent;
  border: none;
  font-family: ${({ theme }) => theme.primaryFont};
  font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.6rem" : "2rem")};
  padding: 0.3rem;
  margin-top: ${({ theme }) => (theme.name === "darkMode" ? "1rem" : "1.3rem")};
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
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
`;
