import React from "react";
import { Flex, Heading } from "rebass";
import { Button } from "./components/Button";
import { useFormContext } from "react-hook-form";

import { Field } from "./components/Field";
import { Error } from "./components/Error";

export const SignUpForm = ({ serverError, onSubmit }) => {
  const { errors, register, handleSubmit, watch } = useFormContext();

  return (
    <Flex flexDirection="column" flex={1}>
      <Heading fontSize={3} textAlign="center" mb={3}>
        Request an invite
      </Heading>

      {serverError && <Error sx={{ textAlign: "center" }}>{serverError}</Error>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" flex={1}>
          <Field
            errors={errors}
            name={"fullName"}
            placeholder="Full Name"
            ref={register({
              required: "Full name is reqired"
            })}
          />

          <Field
            errors={errors}
            name={"email"}
            placeholder="Email"
            ref={register({
              required: "Email address is required",
              pattern: {
                value: /^.+@.+$/i,
                message: "Must be a valid email address"
              }
            })}
          />

          <Field
            errors={errors}
            name="confirmEmail"
            placeholder="Confirm email"
            ref={register({
              required: "Confirm email address is required",
              pattern: {
                value: /^.+@.+$/i,
                message: "Must be a valid email address"
              },
              validate: () => {
                console.log("validating");

                const email = watch("email");
                const confirmEmail = watch("confirmEmail");

                console.log(email, confirmEmail);

                if (email !== confirmEmail) return "Emails must match";
              }
            })}
          />
        </Flex>

        <Button type="submit" width={1}>
          Send
        </Button>
      </form>
    </Flex>
  );
};
