import styled from "styled-components";

export type InputProps = {
  suffix?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ suffix, ...props }: InputProps) => {
  return (
    <Wrapper>
      <Field {...props} />
      {suffix && <Suffix>{suffix}</Suffix>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  min-width: 200px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 99999px;
  padding: 0 20px;
  transition: all 0.2s ease-in-out;
`;

const Field = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.text.size.normal};
  font-weight: ${({ theme }) => theme.text.weight.bold};
  font-family: "DM Sans", sans-serif;

  ::placeholder {
    color: rgb(192, 192, 192);
    font-weight: ${({ theme }) => theme.text.weight.regular};
  }
`;

const Suffix = styled.div`
  position: absolute;
  right: 20px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.text.size.normal};
`;

export default Input;
