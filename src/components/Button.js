import React from "react";
import { Button as RebassButton } from "rebass";
import { motion } from "framer-motion";

const MotionButton = motion.custom(RebassButton);

export const Button = props => (
  <MotionButton
    {...props}
    sx={{
      boxShadow: "0px 5px 10px 1px rgba(0,0,0,0.2)",
      borderBottom: "3px solid rgba(0, 0, 0, 0.4)"
    }}
  />
);
