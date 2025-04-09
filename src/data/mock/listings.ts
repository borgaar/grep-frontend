import type { ListingDTO } from "@/api/services";

const mockListings: ListingDTO[] = Array.from({ length: 200 }, (_, index) => {
  return {
    id: "1",
    title: "Beautiful Apartment in the City Center",
    description: "A cozy apartment located in the heart of the city.",
    price: index,
    category: {
      name: "Apartment",
    },
    createdAt: new Date().toISOString(),
    author: {
      id: "user1",
      firstName: "John",
      lastName: "Doe",
      phone: "+1234567890",
    },
    isBookmarked: false,
    location: {
      lat: 100.123456,
      lon: 200.654321,
    },
  };
});

export default mockListings;
