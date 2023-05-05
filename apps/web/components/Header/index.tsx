import Link from "next/link";
import styled from "styled-components";

import PolkadotButton from "./PolkadotButton";
import Upload from "./Upload";
import WalletButton from "./WalletButton";

const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Menu>
          <Link href={"/"}>
            <Brand>{"nfters"}</Brand>
          </Link>
          <Separator />
          <Nav>
            <NavItem>{"Marketplace"}</NavItem>
            <NavItem>{"Resource"}</NavItem>
            <NavItem>{"About"}</NavItem>
          </Nav>
        </Menu>
        <Interact>
          <Upload />
          <PolkadotButton />
          <WalletButton />
        </Interact>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 110px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
`;

const Brand = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.text.size.title};
`;

const Separator = styled.span`
  width: 1px;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.border.primary};
`;

const Nav = styled.ul`
  display: flex;
  gap: 40px;
`;

const NavItem = styled.li`
  font-weight: ${({ theme }) => theme.text.weight.medium};
`;

const Interact = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default Navbar;
