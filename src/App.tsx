import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Dropdown } from "./components/Dropdown";
import { ScrollToTop } from "./components/ScrollToTop";
import { DarkModeButton } from "./components/DarkModeButton";
import { JobDescriptionModal } from "./components/JobDescriptionModal";
import {
  DashboardPage,
  HeroPage,
  JobsPage,
  LoginPage,
  NewAppPage,
  EditAppPage,
  RegisterPage,
  FourOhFourPage,
  AboutPage
} from "./pages/index";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./context/theme";
import { useAppContext } from "./context/AppContext";

export const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { showModal } = useAppContext();
  const siteWrapperRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    setCookie("darkMode", theme === "dark" ? "false" : "true", 7);
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  function getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function setCookie(name: string, value: string, days: number): void {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  useEffect(() => {
    const darkModeCookie = getCookie("darkMode");
    if (darkModeCookie === null) {
      setCookie("darkMode", theme === "dark" ? "true" : "false", 7);
    } else {
      setTheme(darkModeCookie === "true" ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      if (siteWrapperRef?.current) {
        siteWrapperRef.current.style.position = "fixed";
      }
      setTimeout(() => {
        document?.querySelector(".show")?.classList?.add("grow");
      }, 50);
    } else {
      if (siteWrapperRef?.current) {
        siteWrapperRef.current.style.position = "relative";
      }
    }
  }, [showModal]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ScrollToTop />
      <Wrapper $showModal={showModal}>
        <Navbar />
        <div className="dark-mode-button-wrapper">
          <DarkModeButton theme={theme} toggleDarkMode={toggleDarkMode} />
        </div>
        <Dropdown theme={theme} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HeroPage theme={theme} />} />
          <Route path="/about" element={<AboutPage theme={theme} />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/applications/new" element={<NewAppPage />} />
          <Route path="/applications/:id/edit" element={<EditAppPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<FourOhFourPage theme={theme} />} />
        </Routes>
        <Footer />
        {showModal && <JobDescriptionModal />}
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div.attrs<{ $showModal?: boolean }>(props => ({
  $showModal: props.$showModal || false
}))<{ $showModal: boolean }>`
  position: ${({ $showModal }) => ($showModal ? "fixed" : "relative")};
  width: 100%;
  .dark-mode-button-wrapper {
    display: none;
  }
  @media (min-width: 768px) {
    .dark-mode-button-wrapper {
      position: relative;
      display: block;
      z-index: 999;
    }
  }
`;
