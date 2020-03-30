import React, { useCallback, useState } from "react";
import { Flex, Button, Text } from "rebass";
import { Panel } from "./components/Panel";
import { useForm, FormContext } from "react-hook-form";
import * as api from "./api";
import Loader from "react-spinners/PulseLoader";
import { useTheme } from "emotion-theming";
import { SignUpForm } from "./SignUpForm";

const serverErrorMap = {
  "Bad Request: Email is already in use":
    "Sorry, the provided email address is already in use."
};

const mapServerError = err => {
  if (
    err.response &&
    err.response.data.errorMessage &&
    serverErrorMap[err.response.data.errorMessage]
  ) {
    return serverErrorMap[err.response.data.errorMessage];
  } else {
    return "Sorry, something went wrong.";
  }
};

const SignUpSuccess = ({ onSignUpComplete }) => (
  <Flex
    flex={1}
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Text fontSize={3} mb={4} textAlign="center">
      Thank you we will be in touch shortly!
    </Text>

    <Button onClick={onSignUpComplete}>Close</Button>
  </Flex>
);

const SignUpLoading = () => {
  const theme = useTheme();

  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Loader color={theme.colors.primary} />
    </Flex>
  );
};

const signUpStates = {
  form: SignUpForm,
  submitting: SignUpLoading,
  submitted: SignUpSuccess
};

export const SignUp = ({ onSignUpComplete }) => {
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const [serverError, setServerError] = useState(null);
  const [flowState, setFlowState] = useState("form");

  const onSubmit = useCallback(async values => {
    setServerError(null);
    setFlowState("submitting");

    try {
      await api.signUp({
        name: values.fullName,
        email: values.email
      });
    } catch (err) {
      setFlowState("form");
      setServerError(mapServerError(err));
    }

    setFlowState("submitted");
  }, []);

  const ActiveComponent = signUpStates[flowState];

  return (
    <Panel p={3} minHeight="200px">
      <FormContext {...methods}>
        <ActiveComponent
          serverError={serverError}
          onSubmit={onSubmit}
          onSignUpComplete={onSignUpComplete}
        />
      </FormContext>
    </Panel>
  );
};
