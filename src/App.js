import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Dropdown from "./components/Dropdown";
import Dashboard from "./components/Dashboard";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((currentValue) => !currentValue);
  };

  return (
    <BrowserRouter>
      <Wrapper>
        <ScrollToTop />
        <Navbar
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        <Dropdown
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route path="/applications" element={<List />} />
          <Route path="/applications/edit/:id" element={<Edit />} />
          <Route path="/applications/new" element={<Create />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.div`
  min-height: calc(100vh + 5rem);
  background-color: var(--white);
  font-family: "Playfair Display", serif;
`;
