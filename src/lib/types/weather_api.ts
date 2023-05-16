export interface Location {
  id: number;
  lat: number; // Latitude in decimal degree
  lon: number; // Longitude in decimal degree
  name: string; // Location name
  region?: string; // Region or state of the location, if available
  country: string; // Location country
  tz_id?: string; // Time zone name
  localtime_epoch?: number; // Local date and time in Unix time
  localtime?: string; // Local date and time
}
