import React, { createContext, useContext, useEffect, useState } from "react";
import { IApplicationModel, IAppState, ICompanyResult, IJobResult, IUserModel } from "../interfaces/interfaces";

export const url =
  process.env.NODE_ENV === "production" ? "https://apply-yourself-server.onrender.com" : "http://localhost:5000";

const AppContext = createContext<IAppState | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppContextProvider");
  return context;
};

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [applications, setApplications] = useState<IApplicationModel[]>([]);
  const [currentJobPageResults, setCurrentJobPageResults] = useState<any>(null);
  const [currentCompanyPageResults, setCurrentCompanyPageResults] = useState<any>(null);
  const [user, setUser] = useState<IUserModel | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<IJobResult | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<ICompanyResult | null>(null);

  const toggleDropdown = () => setIsDropdownOpen(currentValue => !currentValue);
  const toggleUserDropdown = () => setIsUserDropdownOpen(currentValue => !currentValue);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${url}/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const apps = (await response.json()) as IApplicationModel[];
      setApplications(apps);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${url}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const currentUser = (await response.json()) as IUserModel;
      setUser(currentUser);
    } catch (e) {
      console.log(e);
    }
  };

  // Set applications when user logs in or out
  useEffect(() => {
    if (loggedIn) {
      fetchApplications();
      fetchUser();
    } else {
      setApplications([]);
    }
  }, [loggedIn]);

  // Validate user's token to set loggedIn state
  const getLoggedIn = async () => {
    try {
      const response = await fetch(`${url}/auth/loggedIn`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const isLoggedIn = await response.json();
      setLoggedIn(isLoggedIn);
    } catch (e) {
      console.log(e);
    }
  };

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
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  const contextValue: IAppState = {
    loggedIn,
    setLoggedIn,
    applications,
    setApplications,
    user,
    setUser,
    fetchApplications,
    getLoggedIn,
    logoutUser,
    isDropdownOpen,
    toggleDropdown,
    isUserDropdownOpen,
    setIsUserDropdownOpen,
    toggleUserDropdown,
    currentJobPageResults,
    setCurrentJobPageResults,
    currentCompanyPageResults,
    setCurrentCompanyPageResults,
    selectedJob,
    setSelectedJob,
    selectedCompany,
    setSelectedCompany,
    showModal,
    setShowModal
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
