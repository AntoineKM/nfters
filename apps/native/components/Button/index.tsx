import { Text, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export type ButtonProps = {
  children: string | React.ReactNode;
} & TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({ children }: ButtonProps) => {
  return (
    <Container>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Container>
  );
};

const Container = styled.View`
  background-color: red;
  padding: 10px;
`;

export default Button;
