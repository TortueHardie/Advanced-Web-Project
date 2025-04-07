export enum UserRole {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurantOwner',
  DELIVERER = 'deliverer'
}

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  password?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
} 