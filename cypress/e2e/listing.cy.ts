// https://on.cypress.io/api
import { MOCK_FIRST_NAME, MOCK_LAST_NAME, MOCK_PHONE, MOCK_TOKEN } from "../fixtures/constants";

describe("Sign In", () => {
  beforeEach(() => {
    window.localStorage.setItem("Authorization", MOCK_TOKEN);
    window.localStorage.setItem("language", "en");
    window.localStorage.setItem("colorMode", "light");

    cy.intercept(
      {
        method: "GET",
        url: "/api/listing/",
      },
      [
        [
          {
            id: "mock-1",
            title: "Mock Title 1",
            description: "Mock description 1",
            location: {
              lat: 63.41849746211945,
              lon: 10.402745604326231,
            },
            price: 100,
            createdAt: "2025-04-10T11:15:37.711Z",
            updatedAt: "2025-04-10T11:15:37.711Z",
            category: {
              name: "Mock Category 1",
            },
            author: {
              id: "12345678",
              phone: "12345678",
              firstName: "Mock",
              lastName: "Seller",
            },
            isReserved: false,
            isSold: false,
            imageIds: ["…"],
            isBookmarked: false,
            reservedBy: null,
            soldTo: null,
          },
        ],
      ],
    ).as("getListings");

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

    cy.visit("/");
  });

  it("shows the listings page", () => {
    // Assert that the listings page is displayed
    cy.get("h1").contains("Listings").should("be.visible");
  });
});
