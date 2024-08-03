import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import styled from "styled-components";
import { RiLinkedinBoxFill, RiProfileLine, RiComputerLine, RiServerLine } from "react-icons/ri";

export const Footer = () => {
  return (
    <Wrapper>
      <section className="top">
        <article className="sitemap">
          <h2>Sitemap</h2>
          <Link to="/" className="logo">
            Home
          </Link>
          <Link to="/applications/new">New Application</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </article>
        <article className="sitemap">
          <h2>Connect</h2>
          <a rel="noreferrer" target="_blank" href="https://www.alexstepanian.com/">
            <RiProfileLine className="icon" /> Portfolio
          </a>
          <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/alexander-stepanian/">
            <RiLinkedinBoxFill className="icon" /> LinkedIn
          </a>
          <a rel="noreferrer" target="_blank" href="https://github.com/a-stepanian/apply-yourself-client">
            <RiComputerLine className="icon" /> Client Repo
          </a>
          <a rel="noreferrer" target="_blank" href="https://github.com/a-stepanian/apply-yourself-server">
            <RiServerLine className="icon" /> Server Repo
          </a>
        </article>
        <div className="img-wrapper">
          <img src="/connect.svg" alt="Global connections." />
        </div>
      </section>
      <p className="copyright">&copy;2022 Apply Yourself</p>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.footer`
  background-color: var(--light-purple);

  .top {
    display: flex;
    justify-content: space-evenly;
  }

  .sitemap {
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
    h2 {
      font-family: "Poppins", sans-serif;
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
    a {
      height: 1.5rem;
      text-decoration: none;
      color: black;
      margin: 0.6rem 0;
      display: flex;
      align-items: center;
    }
    .icon {
      font-size: 1.3rem;
      transform: translateY(0.1rem);
      padding-right: 0.2rem;
    }
  }
  .img-wrapper {
    display: none;
  }

  .copyright {
    width: 100%;
    background-color: var(--purple);
    padding: 1rem 0;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.1rem;
  }
  @media (min-width: 990px) {
    .sitemap {
      h2 {
        font-size: 1.6rem;
        margin: 1rem 0;
      }
    }
    .img-wrapper {
      margin: 3rem 0;
      display: block;
      width: 33%;
      img {
        width: 100%;
        animation: rock 4s infinite linear;
      }
    }
    @keyframes rock {
      0% {
        transform: rotate(0);
      }
      25% {
        transform: rotate(3deg);
      }
      50% {
        transform: rotate(0);
      }
      75% {
        transform: rotate(-3deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  }
`;
