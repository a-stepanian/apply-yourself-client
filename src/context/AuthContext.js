import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [applications, setApplications] = useState([]);

  // const url = "https://client-apply-yourself";
  const url = "http://localhost:5000";

  useEffect(() => {
    if (loggedIn) {
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

      fetchApplications();
      return;
    }
  }, [loggedIn]);

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
      value={{ loggedIn, getLoggedIn, setLoggedIn, applications }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
