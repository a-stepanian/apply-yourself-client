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
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<IAppState | undefined>(undefined);

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [applications, setApplications] = useState<IApplicationModel[]>([]);
  const [user, setUser] = useState<IUserModel | undefined>(undefined);

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
    getLoggedIn
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
