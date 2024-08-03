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
      <div className="copyright">
        <p>&copy;2022 Apply Yourself</p>
        <p>
          Designed & Developed by <a href="https://www.alex-stepanian.com">Alex Stepanian</a>
        </p>
      </div>
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
    margin: 3rem 0 1rem;
    display: flex;
    flex-direction: column;
    h2 {
      font-family: "Poppins", sans-serif;
      font-size: 0.7rem;
      font-weight: 900;
    }
    a {
      height: 1.5rem;
      text-decoration: none;
      color: black;
      margin: 0.6rem 0 0;
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
    background: linear-gradient(#111, 85%, #3a5eff);
    padding: 0;
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-top: 10px;
      text-align: center;
      &:first-of-type {
        color: #3a5eff;
      }
      &:last-of-type {
        font-weight: 700;
        font-size: 0.6rem;
        color: #222;
        a {
          color: #000e4f;
          white-space: nowrap;
        }
      }
    }
  }
  @media (min-width: 990px) {
    .sitemap {
      h2 {
        font-size: 0.8rem;
        margin-top: 1rem;
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
