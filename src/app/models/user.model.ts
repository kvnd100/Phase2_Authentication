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
}

