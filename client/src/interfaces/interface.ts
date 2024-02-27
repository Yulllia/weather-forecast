import { ReactNode } from "react";

export interface User {
  firstName: string;
  lastName: string;
  image: string;
}

export interface Card {
  _id: string;
  city: string;
  endDate: string;
  image: string;
  startDate: string;
}
export interface WeatherI {
  tempmax: number;
  tempmin: number;
  temp?: number;
  datetime: string;
  icon: string;
}


export interface City {
  city: string;
  image: string;
}


export interface LogoutProps {
  children?: ReactNode;
}
