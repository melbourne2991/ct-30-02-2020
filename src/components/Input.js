import React from "react";
import { Input as RebassInput } from "@rebass/forms";

export const Input = React.forwardRef((props, ref) => (
  <RebassInput
    ref={ref}
    py={2}
    {...props}
    backgroundColor="#f9f9f9"
    sx={{
      border: "2px solid rgba(0, 0, 0, 0.1)"
    }}
  />
));
