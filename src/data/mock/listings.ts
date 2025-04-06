import type { Listing } from "@/data/types/listings/Listing";

const mockListings: Listing[] = [
  {
    author: {
      id: "author-1",
      name: "John Doe",
      phone: "+1234567890",
    },
    id: "1",
    image: "https://picsum.photos/200/300",
    bookmarks: 10,
    category: {
      id: "category-1",
      name: "Electronics",
    },
    createdAt: new Date("2023-01-01"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: false,
    location: {
      lat: 37.7749,
      lng: -122.4194,
    },
    price: 1000,
    title: "Awesome Gadget",
    updatedAt: new Date("2023-01-02"),
  },
  {
    author: {
      id: "author-2",
      name: "Jane Smith",
      phone: "+1987654321",
    },
    id: "2",
    image: "https://picsum.photos/200/300",
    bookmarks: 5,
    category: {
      id: "category-2",
      name: "Furniture",
    },
    createdAt: new Date("2023-01-05"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: true,
    location: {
      lat: 40.7128,
      lng: -74.006,
    },
    price: 2000,
    title: "Antique Wooden Desk",
    updatedAt: new Date("2023-01-07"),
  },
  {
    author: {
      id: "author-3",
      name: "Robert Johnson",
      phone: "+1122334455",
    },
    image: "https://picsum.photos/200/300",
    id: "3",
    bookmarks: 15,
    category: {
      id: "category-3",
      name: "Vehicles",
    },
    createdAt: new Date("2023-01-10"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: false,
    location: {
      lat: 34.0522,
      lng: -118.2437,
    },
    price: 3000,
    title: "2018 Toyota Camry",
    updatedAt: new Date("2023-01-15"),
  },
  {
    author: {
      id: "author-4",
      name: "Emily Davis",
      phone: "+1567891234",
    },
    id: "4",
    image: "https://picsum.photos/200/300",
    bookmarks: 8,
    category: {
      id: "category-4",
      name: "Clothing",
    },
    createdAt: new Date("2023-01-18"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: true,
    location: {
      lat: 51.5074,
      lng: -0.1278,
    },
    price: 4000,
    title: "Designer Leather Jacket",
    updatedAt: new Date("2023-01-20"),
  },
  {
    author: {
      id: "author-5",
      name: "Michael Brown",
      phone: "+1654987321",
    },
    id: "5",
    image: "https://picsum.photos/200/300",
    bookmarks: 3,
    category: {
      id: "category-5",
      name: "Sports",
    },
    createdAt: new Date("2023-01-22"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: false,
    location: {
      lat: 47.6062,
      lng: -122.3321,
    },
    price: 5000,
    title: "Trek Mountain Bike",
    updatedAt: new Date("2023-01-25"),
  },
  {
    author: {
      id: "author-6",
      name: "Sarah Wilson",
      phone: "+1789456123",
    },
    id: "6",
    image: "https://picsum.photos/200/300",
    bookmarks: 12,
    category: {
      id: "category-1",
      name: "Electronics",
    },
    createdAt: new Date("2023-01-28"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: true,
    location: {
      lat: 41.8781,
      lng: -87.6298,
    },
    price: 6000,
    title: "MacBook Pro 2022",
    updatedAt: new Date("2023-02-01"),
  },
  {
    author: {
      id: "author-7",
      name: "David Miller",
      phone: "+1321654987",
    },
    id: "7",
    image: "https://picsum.photos/200/300",
    bookmarks: 7,
    category: {
      id: "category-6",
      name: "Real Estate",
    },
    createdAt: new Date("2023-02-05"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: false,
    location: {
      lat: 48.8566,
      lng: 2.3522,
    },
    price: 7000,
    title: "Downtown Apartment",
    updatedAt: new Date("2023-02-10"),
  },
  {
    author: {
      id: "author-8",
      name: "Lisa Anderson",
      phone: "+1456789123",
    },
    id: "8",
    image: "https://picsum.photos/200/300",
    bookmarks: 20,
    category: {
      id: "category-7",
      name: "Books",
    },
    createdAt: new Date("2023-02-12"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: true,
    location: {
      lat: 52.52,
      lng: 13.405,
    },
    price: 8000,
    title: "Rare Book Collection",
    updatedAt: new Date("2023-02-15"),
  },
  {
    author: {
      id: "author-9",
      name: "James Taylor",
      phone: "+1234987654",
    },
    id: "9",
    image: "https://picsum.photos/200/300",
    bookmarks: 4,
    category: {
      id: "category-8",
      name: "Pets",
    },
    createdAt: new Date("2023-02-18"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: false,
    location: {
      lat: 35.6762,
      lng: 139.6503,
    },
    price: 9000,
    title: "Complete Aquarium Setup",
    updatedAt: new Date("2023-02-20"),
  },
  {
    author: {
      id: "author-10",
      name: "Patricia Martinez",
      phone: "+1876543219",
    },
    id: "10",
    image: "https://picsum.photos/200/300",
    bookmarks: 9,
    category: {
      id: "category-9",
      name: "Art",
    },
    createdAt: new Date("2023-02-22"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: true,
    location: {
      lat: 19.4326,
      lng: -99.1332,
    },
    price: 10000,
    title: "Abstract Oil Painting",
    updatedAt: new Date("2023-02-25"),
  },
  {
    author: {
      id: "author-11",
      name: "Thomas Clark",
      phone: "+1654321789",
    },
    id: "11",
    image: "https://picsum.photos/200/300",
    bookmarks: 6,
    category: {
      id: "category-10",
      name: "Music",
    },
    createdAt: new Date("2023-03-01"),
    shortDescription: "A great product for sale.",
    description:
      "This is a detailed description of the product. It includes all the features and specifications. It is a must-have item for anyone looking for quality and reliability. Don't miss out on this amazing deal! Get it now before it's gone! Limited stock available. Order today and enjoy the benefits of this fantastic product. Satisfaction guaranteed or your money back. Act fast and take advantage of this special offer! Hurry, while supplies last! This is a limited time offer, so don't wait too long. Get your hands on this incredible product and experience the difference it can make in your life. You won't regret it! This is a once-in-a-lifetime opportunity to own something truly special. Don't let it slip away! Contact us now for more information and to place your order. We are here to help you every step of the way. Thank you for considering our product. We look forward to serving you soon! Best regards, The Sales Team. We appreciate your business and are committed to providing you with the best service possible. If you have any questions or concerns, please don't hesitate to reach out to us. We value your feedback and strive to improve our products and services continuously. Thank you for choosing us! We are grateful for your support and trust in our brand. Your satisfaction is our top priority, and we are dedicated to exceeding your expectations. We hope you enjoy your purchase and look forward to serving you again in the future. Have a great day! Best wishes, The Customer Service Team.",
    isBookmarked: false,
    location: {
      lat: 55.7558,
      lng: 37.6173,
    },
    price: 6900,
    title: "Vintage Vinyl Collection",
    updatedAt: new Date("2023-03-05"),
  },
];

export default mockListings;
