import styled from "styled-components";

import GrowthIcon from "../Icons/Growth";
import TransactionIcon from "../Icons/Transaction";

const Amaze: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Title>{"The amazing NFT art of the world here"}</Title>
        <Content>
          <Spec>
            <SpecIcon as={TransactionIcon} />
            <SpecContent>
              <SpecTitle>{"Fast Transaction"}</SpecTitle>
              <SpecDescription>
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam etiam viverra tellus imperdiet."
                }
              </SpecDescription>
            </SpecContent>
          </Spec>
          <Spec>
            <SpecIcon as={GrowthIcon} />
            <SpecContent>
              <SpecTitle>{"Growth Transaction"}</SpecTitle>
              <SpecDescription>
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam etiam viverra tellus"
                }
              </SpecDescription>
            </SpecContent>
          </Spec>
        </Content>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 96px 0;
  background-color: ${({ theme }) => theme.colors.background.lighter};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.text.size.title};
  max-width: 40%;
  padding-right: 20px;
`;

const Content = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
`;

const Spec = styled.div`
  display: flex;
  gap: 10px;
`;

const SpecIcon = styled.div`
  width: 36px;
  height: 36px;
`;

const SpecContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`;

const SpecTitle = styled.h3`
  font-size: ${({ theme }) => theme.text.size.medium};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const SpecDescription = styled.p`
  font-size: ${({ theme }) => theme.text.size.normal};
  color: rgb(105, 105, 105);
`;

export default Amaze;
