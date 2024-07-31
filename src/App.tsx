import React, { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { Navbar } from "./components/Navbar.tsx";
import { Dropdown } from "./components/Dropdown.tsx";

import { Footer } from "./components/Footer.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import { NewAppPage } from "./pages/NewAppPage.tsx";
import { EditAppPage } from "./pages/EditAppPage.tsx";
import { HeroPage } from "./pages/HeroPage.tsx";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { FourOhFourPage } from "./pages/FourOhFourPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(currentValue => !currentValue);
  };

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Wrapper>
          <ScrollToTop />
          <Navbar isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
          <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route
              path="/login"
              element={<LoginPage isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />}
            />
            <Route
              path="/register"
              element={<RegisterPage isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />}
            />
            <Route
              path="/applications/new"
              element={<NewAppPage isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />}
            />
            <Route
              path="/applications/:id/edit"
              element={<EditAppPage isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />}
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<FourOhFourPage />} />
          </Routes>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;

// @ts-ignore
const Wrapper = styled.div`
  background-color: var(--white);
  font-family: "Playfair Display", serif;
`;
