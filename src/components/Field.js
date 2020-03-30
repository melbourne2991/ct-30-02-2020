import React from "react";
import { ErrorMessage } from "react-hook-form";
import { Error } from "./Error";
import { Input } from "./Input";

export const Field = React.forwardRef(
  ({ errors, type, name, placeholder }, ref) => (
    <>
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <Error id={`error-${name}`}>{message}</Error>}
      </ErrorMessage>

      <Input
        id={`field-${name}`}
        name={name}
        placeholder={placeholder}
        mb={3}
        ref={ref}
        type={type}
      />
    </>
  )
);
