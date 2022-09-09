import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Dropdown from "./components/Dropdown";
import Dashboard from "./components/Dashboard";
import Hero from "./components/Hero";

const App = () => {
  const [allApps, setAllApps] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch all apps from DB
  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch(
        "https://server-apply-yourself.herokuapp.com/applications"
      );
      // const response = await fetch("http://localhost:5000/applications/");
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const data = await response.json();
      setAllApps(data);
    };
    fetchApps();
    return;
  }, [allApps.length]);

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
          <Route exact path="/" element={<Hero />} />
          <Route
            path="/applications"
            element={<List allApps={allApps} setAllApps={setAllApps} />}
          />
          <Route path="/applications/edit/:id" element={<Edit />} />
          <Route path="/applications/new" element={<Create />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
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
