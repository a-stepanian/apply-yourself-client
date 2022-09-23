import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ShowAppsPage = ({ user }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [applications, setApplications] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  // const url = "https://server-apply-yourself.herokuapp.com/applications";
  const url = "http://localhost:5000/applications/";

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const id = user._id;
  //       const response = await fetch(`${url}${id}`);
  //       if (!response.ok) {
  //         console.log(`An error has occurred: ${response.statusText}`);
  //         return;
  //       }
  //       const foundUser = await response.json();
  //       if (!foundUser) {
  //         console.log(`foundUser with id ${id} not found`);
  //         navigate("/");
  //         return;
  //       }
  //       setCurrentUser(foundUser);
  //       setApplications(foundUser.applications);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchUser();
  //   return;
  // }, [params.id, navigate]);

  return (
    <Wrapper>
      {currentUser && <h1>{currentUser.username}'s Applications</h1>}
      {applications ? (
        applications.map((app, index) => {
          return <h2 key={index}>company: {app.company}</h2>;
        })
      ) : (
        <h2>No applications found</h2>
      )}
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

export default ShowAppsPage;
