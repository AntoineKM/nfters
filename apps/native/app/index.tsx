import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import WalkthroughScreen from "../components/Walkthrough";

export default function Native() {
  return (
    <Container>
      <StatusBar style={"light"} />
      <WalkthroughScreen />
    </Container>
  );
}

const Container = styled.Text`
  background-color: #080a0c;
  flex: 1;
`;
