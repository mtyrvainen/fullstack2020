import patientData from '../../data/patients';
import { PatientWithoutSsn, Patient, NewPatient } from '../types';
import uuid from 'uuid-random';

const patients: Patient[] = patientData;

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( newPatientData: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...newPatientData
  };

  patients.push(); 
  return newPatient;
};

export default {
  getPatientsWithoutSsn,
  addPatient
};