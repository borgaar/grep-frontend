// https://on.cypress.io/api

import { MOCK_PHONE, MOCK_FIRST_NAME, MOCK_LAST_NAME, MOCK_TOKEN } from "../fixtures/constants";

describe("Sign In", () => {
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
    cy.visit("/sign-in");
  });

  it("signs in successfully with valid details", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/auth/login",
      },
      {
        statusCode: 200,
        body: {
          token: "mock-token",
          firstName: "Cypress",
          lastName: "Test",
          role: "user",
        },
      },
    ).as("loginUser");

    // Fill in the sign in form fields
    cy.get('input[name="phone"]').type("11223344");
    cy.get('input[name="password"]').type("ValidPassword123!");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that we have the username in the navbar
    cy.contains("div.p-menubar-start > div > span", "Cypress Test").should("be.visible");
  });

  it("shows an error message for phone not exists", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/auth/login",
      },
      {
        statusCode: 404,
      },
    ).as("loginUser");

    // Fill in the signup form fields
    cy.get('input[name="phone"]').type("12345678");
    cy.get('input[name="password"]').type("ValidPassword123!");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    cy.checkToast("Phone number or password is incorrect.");
  });

  it("validates required fields", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/auth/login",
      },
      {
        statusCode: 200,
        body: {
          token: "mock-token",
          firstName: "Cypress",
          lastName: "Test",
          role: "user",
        },
      },
    ).as("loginUser");

    // Click the signup button without filling in the fields
    cy.get('button[type="submit"]').click();

    // Assert that validation messages are displayed
    cy.checkToast("Please make sure that all the fields are valid");
  });
});
