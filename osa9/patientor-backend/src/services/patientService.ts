import patientData from '../../data/patients';
import { PublicPatient, Patient, NewPatient, Entry, NewHealthCheckEntry, NewOccupationalHealthCareEntry, NewHospitalEntry } from '../types';
import uuid from 'uuid-random';

const patients: Patient[] = patientData;

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string):  Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( newPatientData: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...newPatientData
  };

  patients.push(newPatient); 
  return newPatient;
};

const addEntryForPatient = ( id: string, newEntryData: NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthCareEntry ): Entry => {
  const newEntry = {
    id: uuid(),
    ...newEntryData
  };

  patients.find(p => p.id === id)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPublicPatients,
  getPatientById,
  addPatient,
  addEntryForPatient
};