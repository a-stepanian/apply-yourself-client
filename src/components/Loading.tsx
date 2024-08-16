import styled from "styled-components";
import { TypingEffect } from "./TypingEffect";
import { useState } from "react";

interface IShow {
  line1: boolean;
  line2: boolean;
}

export const Loading = () => {
  const [show, setShow] = useState<IShow>({ line1: false, line2: false });

  setTimeout(() => setShow(prev => ({ ...prev, line1: true })), 200);
  // setTimeout(() => setShow(prev => ({ ...prev, line2: true })), 8000);

  const wavePattern = "⋅.˳˳.⋅˙ॱ˙⋅.˳˳.⋅⋅.˳˳.⋅˙ॱ˙".repeat(2);

  return (
    <Wrapper>
      {show.line1 && (
        <TypingEffect
          text={`Loading results... ${wavePattern} ...if you can read this... ${wavePattern} ...the server may still be waking up... ${wavePattern} ...Thank you for your patience! ${wavePattern}`}
          textElementType="p"
          speedInMilliseconds={30}
        />
      )}
      {/* {show.line2 && (
        <TypingEffect
          text={`Thank you for your patience ${wavePattern}${wavePattern}`}
          textElementType="p"
          speedInMilliseconds={20}
        />
      )} */}
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  display: flex;
  padding-top: 2rem;
  p {
    margin: 1rem 0;
    color: ${({ theme }) => theme.primaryPink};
    font-family: "Poppins", sans-serif;
    font-size: 0.9rem;
    white-space: nowrap;
    letter-spacing: 2px;
  }
`;
