import React from "react";
import { Button as RebassButton } from "rebass";

export const Button = props => (
  <RebassButton
    {...props}
    sx={{
      boxShadow: "0px 5px 10px 1px rgba(0,0,0,0.2)",
      borderBottom: "3px solid rgba(0, 0, 0, 0.4)"
    }}
  />
);
