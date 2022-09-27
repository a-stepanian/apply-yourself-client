import React, { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";

import HeroPage from "./pages/HeroPage";
import ShowAppsPage from "./pages/ShowAppsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewAppPage from "./pages/NewAppPage";
import EditAppPage from "./pages/EditAppPage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((currentValue) => !currentValue);
  };

  return (
    <AuthContextProvider>
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
            <Route exact path="/" element={<HeroPage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  isDropdownOpen={isDropdownOpen}
                  toggleDropdown={toggleDropdown}
                />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/applications" element={<ShowAppsPage />} />
            <Route path="/applications/new" element={<NewAppPage />} />
            <Route path="/applications/:id/edit" element={<EditAppPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;

const Wrapper = styled.div`
  background-color: var(--white);
  font-family: "Playfair Display", serif;
`;
