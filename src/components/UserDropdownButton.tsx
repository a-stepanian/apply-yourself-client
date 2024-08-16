import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { RiArrowDropDownLine } from "react-icons/ri";

export const UserDropdownButton = () => {
  const { user, toggleUserDropdown, isUserDropdownOpen } = useAppContext();

  return (
    <Wrapper onClick={toggleUserDropdown} className="exclude-click-detection">
      <span className="exclude-click-detection">{user?.username ?? "No username"}</span>
      <RiArrowDropDownLine className={`user-icon exclude-click-detection ${isUserDropdownOpen ? "spin" : ""}`} />
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.button`
  position: relative;
  margin: 6px;
  background-color: ${({ theme }) => theme.primaryBackgroundColor};
  border: 1px solid ${({ theme }) => theme.color3};
  border-radius: 3px;
  color: ${({ theme }) => theme.color3};
  padding: 1rem 0.5rem 1rem 1rem;
  text-decoration: none;
  transition: 0.2s linear;
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => (theme.name === "darkMode" ? theme.color3 : theme.color2)};
    color: ${({ theme }) => theme.primaryBackgroundColor};
  }
  span {
    font-size: ${({ theme }) => (theme.name === "darkMode" ? "0.9rem" : "1.1rem")};
    font-weight: ${({ theme }) => (theme.name === "darkMode" ? "500" : "700")};
    font-family: ${({ theme }) => theme.primaryFont};
    margin-top: 3px;
    margin-right: 5px;
  }
  .user-icon {
    width: 24px;
    height: 24px;
    transition: 0.2s linear;
  }
  .spin {
    transform: rotate(180deg);
  }
`;
export default UserDropdownButton;
