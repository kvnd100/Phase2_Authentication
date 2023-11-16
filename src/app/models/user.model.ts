export enum UserRole {
  Admin = 'Admin',
  TerminalAgent = 'Terminal Agent',
  Passenger = 'Passenger',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
