import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { App } from "../App";
import { mock } from "../axios";

describe("App", () => {
  let container;

  const selectById = id => container.querySelector(`#${id}`);

  const submitFormWithValues = async values => {
    const ctaButton = selectById("cta-button");
    Simulate.click(ctaButton);

    const fullNameFieldInput = selectById("field-fullName");
    const emailFieldInput = selectById("field-email");
    const confirmEmailFieldInput = selectById("field-confirmEmail");

    const submitButton = selectById("signup-submit");

    await act(async () => {
      fullNameFieldInput.value = values.fullName;
      emailFieldInput.value = values.email;
      confirmEmailFieldInput.value = values.confirmEmail;

      Simulate.submit(submitButton);
    });
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    mock.reset();

    act(() => {
      render(<App />, container);
    });
  });

  test("Loads page", () => {
    expect(selectById("logo")).toBeTruthy();
    expect(selectById("cta-button")).toBeTruthy();
  });

  test("Clicking button opens modal", () => {
    const ctaButton = selectById("cta-button");

    expect(selectById("modal")).toBeFalsy();

    Simulate.click(ctaButton);

    expect(selectById("modal")).toBeTruthy();
  });

  test("All fields are required", async () => {
    const ctaButton = selectById("cta-button");
    Simulate.click(ctaButton);

    expect(selectById("error-fullName")).toBeFalsy();
    expect(selectById("error-email")).toBeFalsy();
    expect(selectById("error-confirmEmail")).toBeFalsy();

    const submitButton = selectById("signup-submit");

    await act(async () => {
      Simulate.submit(submitButton);
    });

    expect(selectById("error-fullName").textContent).toBe(
      "Full name is required"
    );

    expect(selectById("error-email").textContent).toBe(
      "Email address is required"
    );

    expect(selectById("error-confirmEmail").textContent).toBe(
      "Confirm email address is required"
    );
  });

  test("Does not allow invalid email addrewsses", async () => {
    await submitFormWithValues({
      fullName: "Ihaveareally Longname",
      email: "bademail.com",
      confirmEmail: "bademail.com"
    });

    expect(selectById("error-email").textContent).toBe(
      "Must be a valid email address"
    );
  });

  test("Required emails to match", async () => {
    await submitFormWithValues({
      fullName: "Ihaveareally Longname",
      email: "goodemail@goodemail.com",
      confirmEmail: "differentgoodemail@goodemail.com"
    });

    expect(selectById("error-confirmEmail").textContent).toBe(
      "Email addresses must match"
    );
  });

  test("Shows success message", async () => {
    mock.onPost("/auth").reply(200);

    await submitFormWithValues({
      fullName: "Ihaveareally Longname",
      email: "goodemail@goodemail.com",
      confirmEmail: "goodemail@goodemail.com"
    });

    expect(selectById("signup-success")).toBeTruthy();
  });

  test("Can close success message", async () => {
    mock.onPost("/auth").reply(200);

    await submitFormWithValues({
      fullName: "Ihaveareally Longname",
      email: "goodemail@goodemail.com",
      confirmEmail: "goodemail@goodemail.com"
    });

    expect(selectById("signup-success")).toBeTruthy();

    Simulate.click(selectById("close-success"));

    expect(selectById("signup-success")).toBeFalsy();

    expect(selectById("logo")).toBeTruthy();
    expect(selectById("cta-button")).toBeTruthy();
  });

  test("Handles known server errors", async () => {
    mock.onPost("/auth").reply(400, {
      errorMessage: "Bad Request: Email is already in use"
    });

    await submitFormWithValues({
      fullName: "Ihaveareally Longname",
      email: "goodemail@goodemail.com",
      confirmEmail: "goodemail@goodemail.com"
    });

    expect(selectById("server-error").textContent).toBe(
      "Sorry, the provided email address is already in use."
    );
  });

  test("Handles unknown server errors", async () => {
    mock.onPost("/auth").reply(500);

    await submitFormWithValues({
      fullName: "Ihaveareally Longname",
      email: "goodemail@goodemail.com",
      confirmEmail: "goodemail@goodemail.com"
    });

    expect(selectById("server-error").textContent).toBe(
      "Sorry, something went wrong."
    );
  });
});
