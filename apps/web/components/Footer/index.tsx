import styled from "styled-components";

import Button from "../Button";
import FacebookIcon from "../Icons/Facebook";
import LinkedInIcon from "../Icons/LinkedIn";
import TwitterIcon from "../Icons/Twitter";
import Input from "../Input";

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Col>
            <Brand>{"nfters"}</Brand>
            <Info>
              {
                "The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.\r"
              }
            </Info>
            <Socials>
              <Social as={FacebookIcon} />
              <Social as={TwitterIcon} />
              <Social as={LinkedInIcon} />
            </Socials>
          </Col>

          <Row>
            <Col>
              <Title>{"Market Place"}</Title>
              <List>
                <ListItem>{"All NFTs"}</ListItem>
                <ListItem>{"New"}</ListItem>
                <ListItem>{"Art"}</ListItem>
                <ListItem>{"Sports"}</ListItem>
                <ListItem>{"Utility"}</ListItem>
                <ListItem>{"Music"}</ListItem>
                <ListItem>{"Domain Name"}</ListItem>
              </List>
            </Col>
            <Col>
              <Title>{"My Account"}</Title>
              <List>
                <ListItem>{"Profile"}</ListItem>
                <ListItem>{"Favorite"}</ListItem>
                <ListItem>{"My Collections"}</ListItem>
                <ListItem>{"Settings"}</ListItem>
              </List>
            </Col>
          </Row>

          <Col>
            <Title>{"Stay in the loop"}</Title>
            <Info>
              {
                "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating NFTs."
              }
            </Info>
            <SubInput
              type={"text"}
              placeholder={"Enter your email address.."}
              suffix={<Button variant={"tertiary"}>{"Subscribe Now"}</Button>}
            />
          </Col>
        </Content>

        <Copyright>
          <span>{"Copyright © 2022 Avi Yansah"}</span>
        </Copyright>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  padding: 32px 0;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  padding: 0 15px;
`;

const Col = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 15px;

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.text.size.medium};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const Info = styled.p`
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;

const Brand = styled.h1`
  font-size: ${({ theme }) => theme.text.size.large};
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;
`;

const Social = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const SubInput = styled(Input)`
  max-width: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ListItem = styled.li`
  font-size: 14px;
`;

const Copyright = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  font-size: 14px;
  padding-top: 32px;
  color: ${({ theme }) => theme.colors.text.lightGrey};
  text-align: center;
  margin-top: 64px;
`;

export default Footer;
