import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((currentValue) => !currentValue);
  };

  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        <Dropdown
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        <Routes>
          <Route exact path="/" element={<List />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.div`
  background-color: var(--white);
  font-family: "Playfair Display", serif;
`;
