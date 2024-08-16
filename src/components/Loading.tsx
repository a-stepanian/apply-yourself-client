import styled from "styled-components";
import { LoadingSpinner } from "./LoadingSpinner";
import { TypingEffect } from "./TypingEffect";
import { useState } from "react";

interface IShow {
  line0: boolean;
  line1: boolean;
  line2: boolean;
  line3: boolean;
}

export const Loading = () => {
  const [show, setShow] = useState<IShow>({
    line0: false,
    line1: false,
    line2: false,
    line3: false
  });

  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line0: true };
    });
  }, 50);
  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line1: true };
    });
  }, 800);
  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line2: true };
    });
  }, 1000);
  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line3: true };
    });
  }, 1200);

  return (
    <Wrapper>
      <LoadingSpinner />
      {show.line0 && <TypingEffect text="Loading results..." textElementType="p" speedInMilliseconds={10} />}

      {show.line1 && (
        <TypingEffect
          text="Waking up the server................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................."
          textElementType="p"
          speedInMilliseconds={10}
        />
      )}
      {/* {show.line2 && <TypingEffect text="The upside is that it's free!" textElementType="p" speedInMilliseconds={20} />}
      {show.line3 && (
        <TypingEffect text="Thank you for your patience :)" textElementType="p" speedInMilliseconds={20} />
      )} */}
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
    margin: 2rem 0;
  }
`;
