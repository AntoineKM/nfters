import styled from "styled-components";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const defaultProps = {
  variant: "primary",
  size: "medium",
};

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
}: ButtonProps) => {
  return (
    <Container variant={variant} size={size}>
      {children}
    </Container>
  );
};

const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 99999px;
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.text.size.normal};
  font-weight: ${({ theme }) => theme.text.weight.bold};
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "0 20px";
      case "large":
        return "0 40px";
      case "medium":
      default:
        return "0 30px";
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.text.primary;
      case "tertiary":
      case "primary":
      default:
        return theme.colors.text.white;
    }
  }};
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return "transparent";
      case "tertiary":
        return theme.colors.background.secondary;
      case "primary":
      default:
        return theme.colors.background.primary;
    }
  }};
  border: ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return `2px solid ${theme.colors.background.primary}`;
      case "tertiary":
      case "primary":
      default:
        return "none";
    }
  }};

  :hover {
    filter: brightness(0.8);
  }
`;

Button.defaultProps = defaultProps;
Button.displayName = "Button";
export default Button;
