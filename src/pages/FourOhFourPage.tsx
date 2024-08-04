// @ts-ignore
import styled from "styled-components";

export const FourOhFourPage = () => {
  return (
    <Wrapper>
      <p className="four-oh-four">404</p>
      <p className="not-found">Page Not Found</p>
      <div className="img-wrapper">
        <img src="/notfound.svg" alt="Alien getting abducted into spaceship." />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background-color: ${({ theme }) => (theme.name === "darkMode" ? theme.bodyBackground : "#11172c")};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  p {
    color: var(--yellow);
    font-weight: 900;
  }
  .four-oh-four {
    font-size: 4rem;
  }
  .not-found {
    font-size: 1.2rem;
  }
  .img-wrapper {
    padding: 1rem 0 0 1rem;
    width: 100%;
    max-width: 30rem;
    display: flex;
    justify-content: center;
    img {
      width: 100%;
    }
  }
`;
