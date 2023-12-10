export interface Flight {
  availableSeats: any;
  flightNumber: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  flightPlan: { location: string; expectedTime: number }[];
}
