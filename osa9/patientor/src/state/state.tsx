import React, { createContext, useContext, useReducer } from "react";
import { Patient, PatientActionTypes, Diagnosis } from "../types";

export type State = {
  patients: { [id: string]: Patient };
  patientDetails: { [id: string]: Patient };
  diagnosisData: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patientDetails: {},
  diagnosisData: {},
};

export const StateContext = createContext<[State, React.Dispatch<PatientActionTypes>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, PatientActionTypes>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
