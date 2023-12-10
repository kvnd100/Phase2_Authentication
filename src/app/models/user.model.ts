export enum UserRole {
  Admin = 'Admin',
  TerminalAgent = 'Terminal Agent',
  Passenger = 'Passenger',
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
}

export interface UserProfile {
  fullName: String;
  passportNumber: String;
  address: String;
  phoneNumber: String;
  profilePicture: String;
}