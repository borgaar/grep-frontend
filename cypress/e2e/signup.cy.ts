// https://on.cypress.io/api

import {
  MOCK_FIRST_NAME,
  MOCK_LAST_NAME,
  MOCK_PASSWORD,
  MOCK_PHONE,
  MOCK_TOKEN,
} from "../fixtures/constants";

describe("Sign Up", () => {
  beforeEach(() => {
    window.localStorage.setItem("Authorization", MOCK_TOKEN);
    window.localStorage.setItem("language", "en");
    window.localStorage.setItem("colorMode", "light");
    cy.intercept(
      {
        method: "GET",
        url: "/api/user/profile",
      },
      {
        statusCode: 200,
        body: {
          phone: MOCK_PHONE,
          firstName: MOCK_FIRST_NAME,
          lastName: MOCK_LAST_NAME,
          role: "user",
        },
      },
    ).as("getProfile");

    // Visit the signup page before each test
    cy.visit("/sign-up");
  });

  it("signs up successfully with valid details", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/auth/register",
      },
      {
        statusCode: 201,
        body: {
          token: MOCK_TOKEN,
          firstName: MOCK_FIRST_NAME,
          lastName: MOCK_LAST_NAME,
          role: "user",
        },
      },
    ).as("registerUser");

    // Fill in the signup form fields
    cy.get('input[name="firstName"]').type(MOCK_FIRST_NAME);
    cy.get('input[name="lastName"]').type(MOCK_LAST_NAME);
    cy.get('input[name="phone"]').type(MOCK_PHONE);
    cy.get('input[name="password"]').type(MOCK_PASSWORD);

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that we have the username in the navbar
    cy.contains("div.p-menubar-start > div > span", "Cypress Test").should("be.visible");
  });

  it("shows an error message for already registered phone number", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/auth/register",
      },
      {
        statusCode: 409,
      },
    ).as("registerUser");

    // Fill in the signup form fields
    cy.get('input[name="firstName"]').type(MOCK_FIRST_NAME);
    cy.get('input[name="lastName"]').type(MOCK_LAST_NAME);
    cy.get('input[name="phone"]').type(MOCK_PHONE);
    cy.get('input[name="password"]').type(MOCK_PASSWORD);

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.checkToast("This phone number is already registered.");
  });

  it("validates required fields", () => {
    // Click the signup button without filling in the fields
    cy.get('button[type="submit"]').click();

    // Assert that validation messages are displayed
    cy.checkToast("Please make sure that all the fields are valid");
  });
});
