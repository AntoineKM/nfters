import styled from "styled-components";

export type InputProps = {
  suffix?: React.ReactNode;
  width?: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  suffix,
  className,
  width,
  ...props
}: InputProps) => {
  return (
    <Wrapper className={className} suffix={!!suffix} width={width}>
      <Field {...props} />
      {suffix && <Suffix>{suffix}</Suffix>}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ suffix?: boolean; width: InputProps["width"] }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${({ width }) =>
    typeof width === "number" ? `${width}px` : width || "100%"};
  min-width: 200px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 99999px;
  padding: 0 20px;
  transition: all 0.2s ease-in-out;
  ${({ suffix }) => suffix && "padding: 5px 5px 5px 20px"}
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
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.text.size.normal};
  height: 100%;
`;

export default Input;
