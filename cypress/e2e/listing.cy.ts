import {
  MOCK_ADDRESS,
  MOCK_FIRST_NAME,
  MOCK_LAST_NAME,
  MOCK_PHONE,
  MOCK_TOKEN,
} from "../fixtures/constants";
import type { AddressResponse } from "../../src/api/geo-norge";
import type { ListingDTO } from "../../src/api/services/models/ListingDTO";

describe("Listing feature works", () => {
  beforeEach(() => {
    window.localStorage.setItem("Authorization", MOCK_TOKEN);
    window.localStorage.setItem("language", "en");
    window.localStorage.setItem("colorMode", "light");

    cy.intercept(
      {
        method: "GET",
        url: "/api/listing*",
      },
      [
        [
          {
            id: "1",
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
          },
        ] satisfies ListingDTO[],
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

    cy.intercept(
      {
        method: "GET",
        url: "/api/category*",
      },
      {
        statusCode: 200,
        body: [
          {
            name: "Mock Category 1",
          },
          {
            name: "Mock Category 2",
          },
        ],
      },
    );

    cy.intercept(
      {
        method: "GET",
        url: "https://ws.geonorge.no/adresser/v1/sok?fuzzy=true&sok=Address+Road+1",
      },
      {
        adresser: [
          {
            adressetekst: MOCK_ADDRESS,
            postnummer: "1000",
            poststed: "Poststed",
            representasjonspunkt: {
              lat: 100,
              lon: 100,
            },
            displayText: "Address Road 1, 1000 Poststed",
          },
        ],
      } satisfies AddressResponse,
    );

    cy.intercept(
      {
        method: "POST",
        url: "/api/listing",
      },
      {
        statusCode: 201,
      },
    );

    cy.intercept(
      {
        method: "GET",
        url: "/api/listing/1",
      },
      {
        id: "…",
        title: "…",
        description: "…",
        location: {
          lat: 1,
          lon: 1,
        },
        price: 1,
        createdAt: "2025-04-10T12:22:58.142Z",
        updatedAt: "2025-04-10T12:22:58.142Z",
        category: {
          name: "…",
        },
        author: {
          id: "…",
          phone: "…",
          firstName: "…",
          lastName: "…",
        },
        isReserved: true,
        isSold: true,
        imageIds: ["…"],
        isBookmarked: true,
        reservedBy: {
          id: "…",
          phone: "…",
          firstName: "…",
          lastName: "…",
        },
        soldTo: {
          id: "…",
          phone: "…",
          firstName: "…",
          lastName: "…",
        },
      },
    );

    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:8080/api/image/upload",
      },
      {
        id: "mock-image",
      },
    );

    cy.intercept(
      {
        method: "PATCH",
        url: "/api/listing/*",
      },
      {
        statusCode: 200,
      },
    );

    cy.visit("/");
  });

  it("can create a new listing", () => {
    cy.get("[data-cy='create-listing']").click();

    // Fill out the form
    cy.get('[data-cy="title"]').type("My new listing");

    cy.get('[data-cy="file"]').selectFile({
      contents: Cypress.Buffer.from("image"),
      fileName: "file.jpg",
      lastModified: Date.now(),
    });

    cy.get('[data-cy="description"]').type("My new listing's description");
    cy.get('[data-cy="price"]').type("200");

    cy.get("#category").click();
    cy.get("#category_0").click();

    cy.get("#address").type(MOCK_ADDRESS);
    cy.get("#address_0").click();

    cy.get('[data-cy="submit"]').click();
  });
});
