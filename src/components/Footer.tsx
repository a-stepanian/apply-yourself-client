import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import styled from "styled-components";
import { RiLinkedinBoxFill, RiProfileLine, RiComputerLine, RiServerLine } from "react-icons/ri";

export const Footer = () => {
  return (
    <Wrapper>
      <div className="top-border"></div>
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
        <div className="top-border"></div>
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
  position: relative;
  background-color: ${({ theme }) => (theme.name === "darkMode" ? theme.bodyBackground : theme.color1)};
  transition: all 0.5s linear;
  .top-border {
    position: absolute;
    z-index: 90;
    top: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => `linear-gradient(90deg, ${theme.color1}, ${theme.color3})`};
  }
  .top {
    display: flex;
    justify-content: space-evenly;
  }

  .sitemap {
    margin: 3rem 0 1rem;
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 0.7rem;
      font-weight: 700;
      color: ${({ theme }) => (theme.name === "darkMode" ? theme.color3 : theme.bodyBackground)};
    }
    a {
      height: 1.5rem;
      text-decoration: none;
      color: ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.bodyBackground)};
      margin: 0.6rem 0 0;
      display: flex;
      align-items: center;
    }
    .icon {
      font-size: 1.3rem;
      transform: translateY(0.1rem);
      padding-right: 0.2rem;
    }
    &:last-of-type {
      a {
        color: ${({ theme }) => (theme.name === "darkMode" ? theme.color2 : theme.bodyBackground)};
      }
    }
  }
  .img-wrapper {
    display: none;
  }

  .copyright {
    position: relative;
    width: 100%;
    background: ${({ theme }) => theme.bodyBackground};
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-top: 10px;
      text-align: center;
      color: ${({ theme }) => theme.color1};
      &:last-of-type {
        font-weight: 700;
        font-size: 0.6rem;
        a {
          white-space: nowrap;
          color: ${({ theme }) => theme.color1};
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
