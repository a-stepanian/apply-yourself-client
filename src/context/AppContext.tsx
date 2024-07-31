import React, { createContext, useContext, useEffect, useState } from "react";
import { IApplicationModel, IUserModel } from "../models/models";

export const url = "https://apply-yourself-server.onrender.com";
// const url = "http://localhost:5000";

interface IAppState {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  applications: IApplicationModel[];
  setApplications: React.Dispatch<React.SetStateAction<IApplicationModel[]>>;
  user: IUserModel | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUserModel | undefined>>;
  fetchApplications: () => void;
  getLoggedIn: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  jobs: any[];
  setJobs: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Props {
  children: React.ReactNode;
}

const AppContext = createContext<IAppState | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [applications, setApplications] = useState<IApplicationModel[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [user, setUser] = useState<IUserModel | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(currentValue => !currentValue);
  };

  // Fetch all applications submitted by the logged in user and clear applications when user logs out
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
      return;
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
    isDropdownOpen,
    toggleDropdown,
    jobs,
    setJobs
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
