import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ShowAppsPage = () => {
  const [user, setUser] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // const url = "https://server-apply-yourself.herokuapp.com/applications";
  const url = "http://localhost:5000/users/";

  useEffect(() => {
    console.log("use effect fired");
    const fetchUser = async () => {
      try {
        const id = params.id.toString();
        const response = await fetch(`${url}${id}`);
        if (!response.ok) {
          console.log(`An error has occurred: ${response.statusText}`);
          return;
        }
        const foundUser = await response.json();
        if (!foundUser) {
          console.log(`foundUser with id ${id} not found`);
          navigate("/");
          return;
        }
        console.log(foundUser);
        setUser(foundUser);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
    return;
  }, [params.id, navigate]);

  return <Wrapper>{user && <h1>{user.username}</h1>}</Wrapper>;
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
