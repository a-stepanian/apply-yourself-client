// @ts-ignore
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
  }, 500);
  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line1: true };
    });
  }, 2000);
  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line2: true };
    });
  }, 3000);
  setTimeout(() => {
    setShow(prev => {
      return { ...prev, line3: true };
    });
  }, 4000);

  return (
    <Wrapper>
      <LoadingSpinner />
      {show.line0 && (
        <TypingEffect text="Waking up the server, just a minute..." textElementType="p" speedInMilliseconds={20} />
      )}

      <div className="hide">
        <TypingEffect
          text="The downside of hosting the backend of this site on a free tiered service is that it goes to sleep after a
        period of inactivity."
          textElementType="p"
          speedInMilliseconds={20}
        />
      </div>
      <div className="hide">
        <TypingEffect text="The upside is that it's free!" textElementType="p" speedInMilliseconds={20} />
      </div>
      <div className="hide">
        <TypingEffect text="Thank you for your patience :)" textElementType="p" speedInMilliseconds={20} />
      </div>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .hide {
    display: none;
  }
  .show {
    margin: 1rem;
    font-size: 1rem;
    font-weight: 500;
    display: block;
  }
`;
