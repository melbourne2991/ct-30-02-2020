import React from "react";
import { Flex } from "rebass";

export const Panel = ({ header, footer, ...props }) => (
  <Flex
    {...props}
    backgroundColor="white"
    sx={{
      borderRadius: 6,
      boxShadow: "0px 0px 52px -20px rgba(0,0,0,0.75)"
    }}
  ></Flex>
);
