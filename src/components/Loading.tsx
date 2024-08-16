import styled from "styled-components";
import { TypingEffect } from "./TypingEffect";
import { useState } from "react";

interface IShow {
  line1: boolean;
  line2: boolean;
}

export const Loading = () => {
  const [show, setShow] = useState<IShow>({ line1: false, line2: false });

  setTimeout(() => setShow(prev => ({ ...prev, line1: true })), 50);
  setTimeout(() => setShow(prev => ({ ...prev, line2: true })), 500);

  const wavePattern = "⋅.˳˳.⋅˙ॱ˙⋅.˳˳.⋅⋅.˳˳.⋅˙ॱ˙".repeat(30);

  return (
    <Wrapper>
      {show.line1 && <TypingEffect text="Loading results..." textElementType="p" speedInMilliseconds={10} />}
      {show.line2 && <TypingEffect text={wavePattern} textElementType="p" speedInMilliseconds={40} />}
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  p {
    margin: 1rem 0;
    color: ${({ theme }) => theme.primaryPink};
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    &:nth-of-type(2) {
      font-weight: 300;
      font-size: 1.5rem;
    }
  }
`;
