import { NewPatient, Gender, Entry, Diagnosis, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, DischargeData, SickLeaveData, HealthCheckRating } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGenericString = (text: any, msg: string): string => {
  if (!text || !isString(text)) {
    throw new Error (`Incorrect or missing value for ${msg}: ${text}`);
  }
  return text;
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
const parseDate = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
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
const isArray = (param: any): param is Array<Entry> => {
  if (param === undefined) {
    return false;
  }
  return param.constructor === Array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCodeArray = (param: any): param is Array<Diagnosis['code']> => {
  if (param === undefined) {
    return false;
  }
  return param.constructor === Array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  const entryType = (param as Entry).type;
  return  entryType === 'Hospital' || entryType === 'HealthCheck' || entryType === 'OccupationalHealthcare';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Entry[] => {
  if (entries === undefined) {
    return [];
  } else {
    if (isArray(entries)) {
      if (entries.length > 0) {
        entries.forEach(entry => { 
          if (!isEntry(entry)) {
            throw new Error(`Incorrect entries format: ${(entry as Entry).id}`);
          }
        });
      }
    } else {
      throw new Error(`Incorrect entries format: ${entries}`);
    }

    return entries;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseType = (type: any): string => {
  if (!type || !isString(type) || (type !== 'HealthCheck' && type !== 'Hospital' && type !== 'OccupationalHealthcare')) {
    throw new Error(`Incorrect or missing entry type: ${type}`);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (codes === undefined) {
    return [];
  } else {
    if (isCodeArray(codes)) {
      if (codes.length > 0) {
        codes.forEach(code => { 
          if (!isString(code)) {
            throw new Error(`Incorrect diagnosis code format: ${code}`);
          }
        });
      }
    } else {
      throw new Error(`Incorrect entries format: ${codes}`);
    }

    return codes;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischargeData = (dischargeData: any): DischargeData | undefined => {
  if (!dischargeData) {
    return undefined;
  }

  if (!dischargeData.date || !isDate(dischargeData.date) || !dischargeData.criteria || !isString(dischargeData.criteria)) {
    throw new Error(`Incorrect discharge data format: ${dischargeData}`);
  } 

  return dischargeData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).includes(healthCheckRating)) {
    throw new Error(`Incorrect or missing HealthCheckRating: ${healthCheckRating}`);
  }

  return Number(healthCheckRating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeaveData = (sickLeaveData: any): SickLeaveData | undefined => {
  if (!sickLeaveData) {
    return undefined;
  }

  if (!sickLeaveData.startDate || !isDate(sickLeaveData.startDate) || !sickLeaveData.endDate || !isDate(sickLeaveData.endDate)) {
    throw new Error(`Incorrect SickLeaveData format: ${sickLeaveData}`);
  }

  return sickLeaveData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry => {
  const type = parseType(object.type);
  switch (type) {
    case "Hospital":
      return {
        type: type,
        date: parseDate(object.date),
        description: parseGenericString(object.description, 'description'),
        specialist: parseGenericString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischargeData(object.discharge)
      };
    case "HealthCheck":
      return {
        type: type,
        date: parseDate(object.date),
        description: parseGenericString(object.description, 'description'),
        specialist: parseGenericString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        type: type,
        date: parseDate(object.date),
        description: parseGenericString(object.description, 'description'),
        specialist: parseGenericString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseGenericString(object.employerName, 'employer'),
        sickLeave: parseSickLeaveData(object.sickLeave)
      };
    default:
      throw new Error(`Incorrect Entry data format: ${object}`);
  }

};
