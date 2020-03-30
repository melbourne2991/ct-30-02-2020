import React from "react";
import { Flex, Text, Box } from "rebass";
import { Global } from "@emotion/core";

const Container = props => (
  <Flex width={1} maxWidth={960} px={3} {...props}></Flex>
);

const Logo = props => (
  <Text fontWeight="bold" fontSize={3} color={"white"} {...props}>
    {"Broccoli & Co."}
  </Text>
);

const Header = () => {
  return (
    <Flex py={[2, 3]} justifyContent={"center"} backgroundColor="brand">
      <Container justifyContent={["center", "center", "flex-start"]}>
        <Logo></Logo>
      </Container>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Flex justifyContent={"center"} py={3} backgroundColor="#f9f9f9">
      <Container flexDirection="column" justifyContent="center">
        <Box mb={3}>
          <Text textAlign="center" fontWeight={"bold"} fontSize={2}>
            Made with ♥ in Melbourne
          </Text>
        </Box>
        <Box>
          <Text textAlign="center" fontSize={1}>
            © {new Date().getFullYear()} {"Broccoli & Co. All rights reserved."}
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export const Layout = React.forwardRef(({ children }, ref) => {
  return (
    <Flex width={1} height="100vh" flexDirection="column" ref={ref}>
      <Global
        styles={{
          "*": {
            boxSizing: "border-box"
          },
          button: {
            cursor: "pointer"
          },
          body: { margin: 0, fontFamily: "Lato, sans-serif" }
        }}
      ></Global>
      <Header />
      <Flex flex={1} justifyContent="center" minHeight={400}>
        <Container py={3}>{children}</Container>
      </Flex>
      <Footer />
    </Flex>
  );
});
