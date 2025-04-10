// https://on.cypress.io/api

describe("Sign In", () => {
  beforeEach(() => {
    // Visit the signup page before each test
    cy.visit("/sign-up");
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
    // Click the signup button without filling in the fields
    cy.get('button[type="submit"]').click();

    // Assert that validation messages are displayed
    cy.checkToast("Phone number or password is incorrect.");
  });
});
