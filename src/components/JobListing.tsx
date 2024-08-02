import styled from "styled-components";

interface IJobListingProps {
  job: any;
}

export const JobListing = (props: IJobListingProps) => {
  const { job } = props;
  {
    return (
      <Wrapper>
        <p>{job.company.name}</p>
        <p>{job.name}</p>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;
