/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: Homescreen
 * Interface for Homescreen
 */
export interface Homescreen {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
}


/**
 * Collection ID: Images
 * Interface for Images
 */
export interface Images {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
}


/**
 * Collection ID: Import1
 * Interface for Import1
 */
export interface Import1 {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price_min?: number;
  /** @wixFieldType number */
  price_max?: number;
  /** @wixFieldType text */
  notes?: string;
  /** @wixFieldType url */
  url?: string;
  /** @wixFieldType rich_content */
  richcontent?: any;
  /** @wixFieldType reference */
  reference?: Gallery;
  /** @wixFieldType rich_content */
  richcontent1?: any;
}


/**
 * Collection ID: gallery
 * Interface for Gallery
 */
export interface Gallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  altText?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType reference */
  reference?: Import1;
}


/**
 * Collection ID: restaurantinformation
 * Interface for RestaurantInformation
 */
export interface RestaurantInformation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  restaurantName?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  aboutDescription?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  openingHoursDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  restaurantLogo?: string;
  /** @wixFieldType url */
  reservationUrl?: string;
  /** @wixFieldType url */
  instagramUrl?: string;
}
