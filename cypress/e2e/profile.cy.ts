// https://on.cypress.io/api

import {
  MOCK_FIRST_NAME,
  MOCK_LAST_NAME,
  MOCK_PASSWORD,
  MOCK_PHONE,
  MOCK_TOKEN,
} from "../fixtures/constants";

describe("Profile", () => {
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
    cy.visit("/profile");
  });

  it("can change names and phone number", () => {
    cy.intercept(
      {
        method: "PATCH",
        url: "/api/user/profile",
      },
      {
        statusCode: 200,
      },
    );

    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="firstName"]').type("NewFirstName");

    cy.get('input[name="lastName"]').clear();
    cy.get('input[name="lastName"]').type("NewLastName");

    cy.get('input[name="phone"]').clear();
    cy.get('input[name="phone"]').type("11223344");

    cy.get('button[type="submit"]').contains("Update profile").click();

    cy.checkToast("Profile updated");
  });

  it("can change password", () => {
    cy.intercept(
      {
        method: "PUT",
        url: "/api/auth/password",
      },
      {
        statusCode: 200,
      },
    );

    cy.contains("Change password").click();
    cy.get('input[name="currentPassword"]').clear();
    cy.get('input[name="currentPassword"]').type(MOCK_PASSWORD);

    cy.get('input[name="newPassword"]').clear({ force: true });
    cy.get('input[name="newPassword"]').type(MOCK_PASSWORD);

    cy.get('input[name="confirmPassword"]').clear({ force: true });
    cy.get('input[name="confirmPassword"]').type(MOCK_PASSWORD);

    cy.get('button[type="submit"]').contains("Change Password").click({ force: true });

    cy.checkToast("Password updated");
  });
});
