import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { HeroPage } from "./pages/HeroPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoginPage } from "./pages/LoginPage";
import { NewAppPage } from "./pages/NewAppPage";
import { Dropdown } from "./components/Dropdown";
import { EditAppPage } from "./pages/EditAppPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { FourOhFourPage } from "./pages/FourOhFourPage";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Wrapper>
          <ScrollToTop />
          <Navbar />
          <Dropdown />
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/applications/new" element={<NewAppPage />} />
            <Route path="/applications/:id/edit" element={<EditAppPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<FourOhFourPage />} />
          </Routes>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;

// @ts-ignore
const Wrapper = styled.div`
  background-color: var(--white);
  font-family: "Playfair Display", serif;
`;
