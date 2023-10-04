export class FlightDto {
  id: number;
  flightNumber: string;
  price: number;
  flightStatus: FlightStatus;
  flightDate: Date;
  departureDate: Date;
  departureAirportId: number;
  aircraftId: number;
  arriveDate: Date;
  arriveAirportId: number;
  durationMinutes: number;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<FlightDto> = {}) {
    Object.assign(this, request);
  }
}

export class SeatDto {
  id: number;
  seatNumber: string;
  seatClass: SeatClass;
  seatType: SeatType;
  flightId: number;
  isReserved: boolean;
  createdAt: Date;
  updatedAt?: Date;

  constructor(request: Partial<SeatDto> = {}) {
    Object.assign(this, request);
  }
}

export class ReserveSeatRequestDto {
  seatNumber: string;
  flightId: number;

  constructor(request: Partial<ReserveSeatRequestDto> = {}) {
    Object.assign(this, request);
  }
}

export enum FlightStatus {
  UNKNOWN = 0,
  FLYING = 1,
  DELAY = 2,
  CANCELED = 3,
  COMPLETED = 4
}

export enum SeatClass {
  UNKNOWN = 0,
  FIRST_CLASS,
  BUSINESS,
  ECONOMY
}

export enum SeatType {
  UNKNOWN = 0,
  WINDOW,
  MIDDLE,
  AISLE
}
