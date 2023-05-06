import styled from "styled-components";

import Button from "../Button";

const SignUp: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Thumbnail
          alt={"Create and sell your NFTs"}
          src={"/static/images/signup.svg"}
        />
        <Content>
          <Title>{"Create and sell your NFTs"}</Title>
          <Description>
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac phasellus placerat a pellentesque tellus sed egestas. Et tristique dictum sit tristique sed non. Lacinia lorem id consectetur pretium diam ut. Pellentesque eu sit blandit fringilla risus faucibus."
            }
          </Description>
          <Button size={"large"}>{"Sign Up Now"}</Button>
        </Content>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 96px 0;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    flex-direction: column;
    justify-content: center;
    gap: 40px;
  }
`;

const Thumbnail = styled.img`
  max-width: 50%;
  width: 100%;
  height: 600px;
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    max-width: 100%;
    height: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  max-width: 50%;
  width: 100%;
  align-items: flex-start;
  padding: 0 40px;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    max-width: 100%;
    align-items: center;
    padding: 0;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.text.size.title};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;

export default SignUp;
