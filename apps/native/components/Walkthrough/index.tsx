import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, ScrollView, useWindowDimensions } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import walkthroughData from "../../data/walkthrough";

const Walkthrough = () => {
  const insets = useSafeAreaInsets();

  const scrollRef = React.useRef<ScrollView>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <Container>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={1}
        ref={scrollRef}
      >
        {walkthroughData.map(({ title, subtitle, image, inverted }, index) => (
          <Page key={index}>
            <Content width={windowWidth} insets={insets}>
              <ThumbnailImage source={image} contentFit={"contain"} />
              {!inverted ? (
                <>
                  <Title>{title}</Title>
                  <MaskedView
                    style={{ flexDirection: "row", height: 50, width: 250 }}
                    maskElement={<SubTitle>{subtitle}</SubTitle>}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(138, 212, 236, 1)",
                        "rgba(239, 150, 255, 1)",
                        "rgba(255, 86, 169, 1)",
                        "rgba(255, 170, 108, 1)",
                      ]}
                      start={{ x: 0, y: 0.33 }}
                      end={{ x: 1, y: 1 }}
                      style={{ flex: 1 }}
                    />
                  </MaskedView>
                </>
              ) : (
                <>
                  <MaskedView
                    style={{ flexDirection: "row", height: 50, width: 250 }}
                    maskElement={<SubTitle>{title}</SubTitle>}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(138, 212, 236, 1)",
                        "rgba(239, 150, 255, 1)",
                        "rgba(255, 86, 169, 1)",
                        "rgba(255, 170, 108, 1)",
                      ]}
                      start={{ x: 0, y: 0.33 }}
                      end={{ x: 1, y: 1 }}
                      style={{ flex: 1 }}
                    />
                  </MaskedView>
                  <Title>{subtitle}</Title>
                </>
              )}
            </Content>
          </Page>
        ))}
      </ScrollView>
      <IndicatorContainer insets={insets}>
        {walkthroughData.map((_item, index) => {
          const backgroundColor = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [
              "rgba(56, 70, 87, 1)",
              "rgba(61, 141, 255, 1)",
              "rgba(56, 70, 87, 1)",
            ],
            extrapolate: "clamp",
          });
          return (
            <Dot
              key={index}
              style={{
                backgroundColor,
              }}
            />
          );
        })}
      </IndicatorContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Page = styled.View``;

const Content = styled.View<{ width: number; insets: EdgeInsets }>`
  flex: 1;
  width: ${({ width }) => width}px;
  justify-content: center;
  align-items: center;
  padding: 100px 30px ${({ insets }) => 30 + 8 + 30 + (insets.bottom || 0)}px;
`;

const ThumbnailImage = styled(Image)`
  max-width: 295px;
  width: 100%;
  height: 295px;
`;

const Title = styled.Text`
  font-size: 36px;
  color: #fff;
`;

const SubTitle = styled.Text`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
`;

const IndicatorContainer = styled.View<{ insets: EdgeInsets }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ insets }) => 30 + insets.bottom}px;
`;

const Dot = styled(Animated.View)`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  margin: 0 4px;
`;

export default Walkthrough;
