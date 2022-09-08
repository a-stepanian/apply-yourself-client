import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Job from "./Job";
import Filter from "./Filter";

const List = () => {
  const [allApps, setAllApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [filteredApps, setFilteredApps] = useState([]);

  // Fetch all apps from DB
  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch(
        "https://server-apply-yourself.herokuapp.com/applications"
      );
      // const response = await fetch("http://localhost:5000/applications/");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      await setAllApps(data);
      setIsLoading(false);
    };
    fetchApps();
    return;
  }, [allApps.length]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredApps(allApps);
    } else {
      const filtered = allApps.filter((app) => app.status === filter);
      setFilteredApps(filtered);
    }
  }, [filter]);

  if (isLoading) {
    return (
      <>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
        <h1>LOADING</h1>
      </>
    );
  }

  return (
    <Wrapper>
      <header>
        <Filter setFilter={setFilter} />
      </header>

      <section>
        {filteredApps.map((app) => {
          return <Job key={app._id} {...app} />;
        })}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    width: 100%;
    height: 10rem;
    background: url("list.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section {
    width: 100%;
  }
`;

export default List;
