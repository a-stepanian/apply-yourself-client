import { useEffect, useState } from "react";

export const TypingEffect = ({ text, speedInMilliseconds = 20, textElementType = "p" }: ITypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);

  useEffect(() => {
    if (currentLetterIndex >= text.length) {
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentLetterIndex]);
      setCurrentLetterIndex(prev => prev + 1);
    }, speedInMilliseconds);

    return () => clearTimeout(timer);
  }, [currentLetterIndex, text, speedInMilliseconds]);

  const ElementType = textElementType as keyof JSX.IntrinsicElements;

  return <ElementType>{displayedText}</ElementType>;
};

interface ITypingEffectProps {
  text: string;
  speedInMilliseconds: number;
  textElementType:
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "blockquote"
    | "div"
    | "ul"
    | "ol"
    | "li"
    | "span"
    | "a"
    | "strong"
    | "em"
    | "b"
    | "i"
    | "small"
    | "sub"
    | "sup"
    | "code"
    | "abbr"
    | "cite"
    | "time"
    | "label"
    | "caption"
    | "footer"
    | "header";
}
