import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Job from "./Job";
import Filter from "./Filter";
import Loading from "./Loading";
import LineDesign from "./LineDesign";

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
      setAllApps(data);
    };
    fetchApps();
    return;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (allApps.length !== 0) {
      if (filter === "all") {
        setFilteredApps(allApps);
      } else {
        const filtered = allApps.filter((app) => app.status === filter);
        setFilteredApps(filtered);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      return;
    }
  }, [filter, allApps]);

  return (
    <Wrapper>
      <header className="filter">
        <Filter setFilter={setFilter} />
      </header>
      <section>
        <LineDesign />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {filteredApps.map((app) => {
              return <Job key={app._id} {...app} />;
            })}
            {filteredApps.length === 0 && (
              <p className="no-results">No results found.</p>
            )}
          </>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .filter {
    width: 100%;
    height: 15rem;
    background: url("/list.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section {
    position: relative;
    width: 100%;
    min-height: 30rem;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-results {
      z-index: 1;
      position: relative;
      margin: 3.5rem 0 15rem;
      font-size: 1.5rem;
    }
  }
`;

export default List;
