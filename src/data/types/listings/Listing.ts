import type Author from "./Author";
import type Category from "./Category";
import type ListingLocation from "./ListingLocation";

export interface Listing {
  id: string; // uuid
  image: string;
  title: string;
  description: string;
  location: ListingLocation;
  price: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  author: Author;

  // Aggregate fields
  isBookmarked: boolean;
  bookmarks: number;
}
