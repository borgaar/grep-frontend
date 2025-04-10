// https://on.cypress.io/api

describe("Sign Up", () => {
  beforeEach(() => {
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
          token: "mock-token",
          firstName: "Cypress",
          lastName: "Test",
          role: "user",
        },
      },
    ).as("registerUser");

    cy.get("a.signup-link").click();

    // Fill in the signup form fields
    cy.get('input[name="firstName"]').type("Cypress");
    cy.get('input[name="lastName"]').type("Test");
    cy.get('input[name="phone"]').type("11223344");
    cy.get('input[name="password"]').type("ValidPassword123!");

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

    cy.get("a.signup-link").click();

    // Fill in the signup form fields
    cy.get('input[name="firstName"]').type("Brotherman");
    cy.get('input[name="lastName"]').type("Testern");
    cy.get('input[name="phone"]').type("12345678");
    cy.get('input[name="password"]').type("ValidPassword123!");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.checkToast("This phone number is already registered.");
  });

  it("validates required fields", () => {
    cy.get("a.signup-link").click();
    // Click the signup button without filling in the fields
    cy.get('button[type="submit"]').click();

    // Assert that validation messages are displayed
    cy.checkToast("Please make sure that all the fields are valid");
  });
});
