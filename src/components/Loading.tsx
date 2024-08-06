// @ts-ignore
import styled from "styled-components";
import { LoadingSpinner } from "./LoadingSpinner";

export const Loading = () => {
  setTimeout(() => {
    document?.querySelectorAll("p")[0]?.classList.add("show");
  }, 2000);
  setTimeout(() => {
    document?.querySelectorAll("p")[1]?.classList.add("show");
  }, 4000);
  setTimeout(() => {
    document?.querySelectorAll("p")[2]?.classList.add("show");
  }, 6000);
  setTimeout(() => {
    document?.querySelectorAll("p")[3]?.classList.add("show");
  }, 6000);
  return (
    <Wrapper>
      <LoadingSpinner />
      <p>Waking up the server, just a minute...</p>
      <p>
        The downside of hosting the backend of this site on a free tiered service is that it goes to sleep after a
        period of inactivity.
      </p>
      <p>The upside is that it's free!</p>
      <p>Thank you for your patience :)</p>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    display: none;
  }
  .show {
    margin: 1rem;
    font-size: 1rem;
    font-weight: 500;
    display: block;
  }
`;
