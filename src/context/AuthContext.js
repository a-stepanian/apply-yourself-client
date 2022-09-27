import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [applications, setApplications] = useState([]);

  // const url = "https://client-apply-yourself";
  const url = "http://localhost:5000";

  // Fetch all applications submitted by the logged in user and clear applications when user logs out
  const fetchApplications = async () => {
    try {
      await fetch(`${url}/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
        })

        .catch((error) => {
          console.log(error);
          return;
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (loggedIn) {
      fetchApplications();
      return;
    } else {
      setApplications([]);
    }
  }, [loggedIn]);

  // Validate user's token to set loggedIn state
  const getLoggedIn = async () => {
    await fetch(`${url}/auth/loggedIn`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        setLoggedIn(data);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        setLoggedIn,
        applications,
        fetchApplications,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
