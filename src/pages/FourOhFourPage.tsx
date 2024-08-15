import styled from "styled-components";

interface IFourOhFourPageProps {
  theme: string;
}
export const FourOhFourPage = (props: IFourOhFourPageProps) => {
  const { theme } = props;
  return (
    <Wrapper>
      {theme !== "light" && <p className="four-oh-four">404</p>}
      <p className="not-found">Page Not Found</p>
      <div className="img-wrapper">
        <img
          src={`${theme === "light" ? "four-oh-four" : "notfound"}.svg`}
          alt="Illustration representing a 404 error.  Content missing from page."
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  transition: 0.4s linear;
  background-color: ${({ theme }) => theme.primaryBackgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: ${({ theme }) => (theme.name === "darkMode" ? "0" : "8rem")};
  p {
    color: ${({ theme }) => (theme.name === "darkMode" ? "#e3f5c0" : "#111")};
    font-weight: 900;
  }
  .four-oh-four {
    font-size: 4rem;
  }
  .not-found {
    font-size: 1.2rem;
  }
  .img-wrapper {
    margin-bottom: ${({ theme }) => (theme.name === "darkMode" ? "0" : "5rem")};
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
