import { NewPatient, Gender } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || ssn.length > 11) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDateOfBirth = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of birth: ${date}`);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

export default toNewPatient;