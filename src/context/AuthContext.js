import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  // const url = "https://client-apply-yourself/auth/loggedIn";
  const url = "http://localhost:5000/auth/loggedIn";

  const getLoggedIn = async () => {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        console.log("data:", data);
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
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
