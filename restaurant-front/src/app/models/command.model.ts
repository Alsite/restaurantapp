import { Repa } from "./repa.model";
import { Restaurant } from "./restaurant.model";

export interface Command {
  id: number; // Optional if the backend generates the ID
  name: string;
  tprice: number;
  restaurants?: { // Use 'restaurant' (singular)
    id: number;
    name?: string; // Optional fields
    moughataa?: string;
    commune?: string;
    latitude?: number;
    longitude?: number;
  };
  utilisateur?: {
    id: number;
    name?: string; // Optional fields
    email?: string;
    password?: string;
    role?: string;
  };
  repa: {
    id: number;
    name?: string; // Optional fields
    price?: number;
    restaurant?: any; // Optional fields
  }[];
}