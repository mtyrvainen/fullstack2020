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

interface DischargeData {
  date: string;
  criteria: string;
}

interface SickLeaveData {
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

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const SET_PATIENT_DETAILS = 'SET_PATIENT_DETAILS';
export const SET_DIAGNOSIS_DATA = 'SET_DIAGNOSIS_DATA';
export const ADD_ENTRY = 'ADD_ENTRY';
export type PatientActionTypes =
  | SetPatientListAction
  | AddPatientAction
  | SetPatientDetailsAction
  | SetDiagnosisDataAction
  | AddEntryAction;

export interface AddEntryAction {
  type: typeof ADD_ENTRY;
  payload: Entry;
  patientId: string;
}
export interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

export interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

export interface SetPatientDetailsAction {
  type: typeof SET_PATIENT_DETAILS;
  payload: Patient;
}

export interface SetDiagnosisDataAction {
  type: typeof SET_DIAGNOSIS_DATA;
  payload: Diagnosis[];
}

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHeathCareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry = 
| NewHospitalEntry
| NewOccupationalHealthcareEntry
| NewHealthCheckEntry;

export enum EntryOption {
  OccupationalHealthcareEntry = "OccupationalHealthcare",
  HealthCheckEntry = "HealthCheck",
  HospitalEntry = "Hospital"
}