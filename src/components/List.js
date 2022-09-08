import React, { useEffect, useState } from "react";

const List = () => {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all apps from DB
  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch("http://localhost:5000/applications/");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      setApps(data);
      setIsLoading(false);
    };
    fetchApps();
    return;
  }, [apps.length]);

  if (isLoading) {
    return (
      <>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
      </>
    );
  }

  return (
    <main>
      <h2>All Applications</h2>
      <section>
        {apps.map((app) => {
          return (
            <article key={app._id}>
              <h2>{app.company}</h2>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default List;
