export interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface DischargeData {
  date: string;
  criteria: string;
}

export interface SickLeaveData {
  startDate: string;
  endDate: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: DischargeData;
}

export interface OccupationalHeathCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeaveData;
}

export type Entry = 
  | HospitalEntry
  | OccupationalHeathCareEntry
  | HealthCheckEntry;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatient = Omit<Patient, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHeathCareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry = 
| NewHospitalEntry
| NewOccupationalHealthcareEntry
| NewHealthCheckEntry;