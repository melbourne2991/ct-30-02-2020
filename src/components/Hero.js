import React from "react";
import { Flex, Text, Heading } from "rebass";
import { Button } from "./Button";

export const Hero = ({ onClickCta }) => {
  return (
    <Flex alignSelf="center" flex={1} justifyContent="center">
      <Flex
        justifyContent={"center"}
        alignItems="center"
        flexDirection="column"
        mt={-5}
      >
        <Heading fontSize={[5, 5, 6]} mb={3} textAlign="center">
          A better way to enjoy every day.
        </Heading>
        <Text fontSize={[3, 3, 4]} mb={4} textAlign="center">
          Be the first to know when we launch
        </Text>
        <Button
          id="cta-button"
          p={3}
          fontSize={[2, 3]}
          textAlign="center"
          onClick={onClickCta}
        >
          Request an invite
        </Button>
      </Flex>
    </Flex>
  );
};
