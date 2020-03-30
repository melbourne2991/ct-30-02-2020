import React from "react";
import { createPortal } from "react-dom";
import { Box, Flex } from "rebass";
import { motion } from "framer-motion";

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
