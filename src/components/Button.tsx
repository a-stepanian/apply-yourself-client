import styled from "styled-components";

interface IButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  type: "button" | "submit";
  variant: "primary" | "secondary";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  clickHandler: any;
  className?: string;
}

export const Button = (props: IButtonProps) => {
  const { children, disabled, type, size, variant, clickHandler, className } = props;
  return (
    <Wrapper disabled={disabled} type={type} variant={variant} size={size} onClick={clickHandler} className={className}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button<{
  variant: "primary" | "secondary";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}>`
  width: 100%;
  background-color: ${({ theme, variant }) => (variant === "primary" ? theme.color3 : theme.color1)};
  color: ${({ theme, variant }) => (variant === "primary" ? theme.primaryBackgroundColor : theme.color1)};
  font-size: ${({ size }) => {
    switch (size) {
      case "xs":
        return "0.75rem";
      case "sm":
        return "0.875rem";
      case "md":
        return "1rem";
      case "lg":
        return "1.125rem";
      case "xl":
        return "1.25rem";
      case "2xl":
        return "1.5rem";
      case "3xl":
        return "1.875rem";
      default:
        return "1rem";
    }
  }};
  padding: ${({ size }) => {
    switch (size) {
      case "xs":
        return "0.25rem 0.5rem";
      case "sm":
        return "0.5rem 1rem";
      case "md":
        return "0.75rem 1.5rem";
      case "lg":
        return "1rem 2rem";
      case "xl":
        return "1.25rem 2.5rem";
      case "2xl":
        return "1.5rem 3rem";
      case "3xl":
        return "1.75rem 3.5rem";
      default:
        return "0.75rem 1.5rem";
    }
  }};
  border: none;
  border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "5rem")};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ variant }) => (variant === "primary" ? "darkred" : "darkblue")};
  }
`;
