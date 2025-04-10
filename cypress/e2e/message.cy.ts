import { MOCK_TOKEN, MOCK_PHONE, MOCK_FIRST_NAME, MOCK_LAST_NAME } from "../fixtures/constants";
import type { ChatContactDTO } from "../../src/api/services/models/ChatContactDTO";

describe("Message", () => {
  beforeEach(() => {
    // Get all contacts
    cy.intercept(
      {
        method: "GET",
        url: "/api/message/contacts*",
      },
      [
        {
          phone: "11234567",
          firstName: "Brotherman",
          lastName: "Testern",
          lastMessageContent: "Hello, Cypress!",
          lastMessageTimestamp: new Date().toISOString(),
        },
      ] satisfies ChatContactDTO[],
    );

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

    cy.intercept(
      {
        method: "GET",
        url: "/api/message/history*",
      },
      [
        {
          id: "fjdklafjdsaklø",
          senderId: "11234567",
          recipientId: MOCK_PHONE,
          content: "Hello, Cypress!",
          timestamp: new Date(),
          type: "TEXT",
        },
      ],
    );

    cy.visit("/messages");
  });

  it("can send a message", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/message/send",
      },
      {
        id: "fjdsakløfjdsakløfjaklø",
        senderId: MOCK_PHONE,
        recipientId: "11234567",
        content: "Hello, Brotherman!",
        timestamp: new Date(),
        type: "TEXT",
      },
    );

    cy.get("div.message-input-container > input").type("Hello, Brotherman!");
    cy.get("div.message-input-container > button").click();

    cy.intercept(
      {
        method: "GET",
        url: "/api/message/history*",
      },
      [
        {
          id: "fjdsakløfjdsakløfjaklø",
          senderId: MOCK_PHONE,
          recipientId: "11234567",
          content: "Hello, Brotherman!",
          timestamp: new Date(),
          type: "TEXT",
        },

        {
          id: "fjdklafjdsaklø",
          senderId: "11234567",
          recipientId: MOCK_PHONE,
          content: "Hello, Cypress!",
          timestamp: new Date(),
          type: "TEXT",
        },
      ],
    );
  });
});
