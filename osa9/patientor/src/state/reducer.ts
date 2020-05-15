import { State } from "./state";
import { Patient,
  PatientActionTypes, SetPatientListAction, SetPatientDetailsAction, AddPatientAction, AddEntryAction,
   SET_PATIENT_LIST, SET_PATIENT_DETAILS, ADD_PATIENT, ADD_ENTRY, SET_DIAGNOSIS_DATA, Diagnosis, SetDiagnosisDataAction, Entry } from "../types";

export const reducer = (state: State, action: PatientActionTypes): State => {
  switch (action.type) {
    case SET_DIAGNOSIS_DATA:
      return {
        ...state,
        diagnosisData: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnosisData
        }
      };
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload
        }
      };
    case ADD_ENTRY:
      state.patientDetails[action.patientId].entries?.push(action.payload);
      return {
        ...state,
        /*patientDetails: {
          ...state.patientDetails
        }*/
      };
    case SET_PATIENT_DETAILS:
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): SetPatientListAction => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};  

export const addPatient = (patient: Patient): AddPatientAction => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setPatientDetail = (patient: Patient): SetPatientDetailsAction => {
  return {
    type: 'SET_PATIENT_DETAILS',
    payload: patient
  };
};

export const setDiagnosisData = (diagnosis: Diagnosis[]): SetDiagnosisDataAction => {
  return {
    type: 'SET_DIAGNOSIS_DATA',
    payload: diagnosis
  };
};

export const addEntry = (patientId: string, entry: Entry): AddEntryAction => {
  return {
    type: 'ADD_ENTRY',
    payload: entry,
    patientId: patientId
  };
};
