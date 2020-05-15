import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis, HealthCheckRating } from '../types';
import { useStateValue, setPatientDetail, setDiagnosisData, addEntry } from "../state";
import { Container, Icon, List, Divider, Button } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

interface RouteParams {
  id: string;
} 

const PatientDetailsPage: React.FC = () => {
  const patientId = useParams<RouteParams>().id;
  const [{ patientDetails, diagnosisData }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(patientId, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    const fetchPatientDetails = async (id: string) => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetail(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisData = async () => {
      try {
        const { data: diagnosisDataFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisData(diagnosisDataFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (Object.keys(diagnosisData).length === 0 && diagnosisData.constructor === Object) {
      fetchDiagnosisData();
    }

    if (!patientDetails[patientId]) {
      fetchPatientDetails(patientId);
    }
  }, [patientId, dispatch, patientDetails, diagnosisData]);

  const displayGenderIcon = () => {
    switch(patientDetails[patientId].gender) {
      case "male":
        return (<Icon name="mars" />);
      case "female":
        return (<Icon name="venus" />);
      case "other":
        return (<Icon name="genderless" />);
      default:
        return null;
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const showDiagnosisList = (diagnosis: string[]) => {
    return (
      <div style={{ margin: '0.2em 0 0 0.5em'  }}>
        <List bulleted>
          {diagnosis.map(d => <List.Item key={d}>{d} {diagnosisData[d].name}</List.Item>) }
        </List>
      </div>
    );
  };

  const displayEntry = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <>
            <Icon size="huge" name="hospital outline" />
            <List.Content>
              <List.Header>{entry.date} -- Attended by: {entry.specialist}</List.Header>
              <List.Description>
              {entry.description} <br />
                {entry.discharge && <><br /><strong>Discharged:</strong> {entry.discharge.date} - {entry.discharge.criteria}</>} 
                {entry.diagnosisCodes && <>{showDiagnosisList(entry.diagnosisCodes)}</>}
              </List.Description>
            </List.Content>
          </>
        );
      case "HealthCheck":
        return(
          <>
            <Icon size="huge" name="user md" />
            <List.Content>
              <List.Header>{entry.date} -- Attended by: {entry.specialist}</List.Header>
              <List.Description>
                {entry.description}<br />
                {entry.diagnosisCodes && <>{showDiagnosisList(entry.diagnosisCodes)}</>}
                <Divider />
                {entry.healthCheckRating === HealthCheckRating.Healthy && <><Icon size="large" name="heart" /><Icon size="large" name="heart" /><Icon size="large" name="heart" /><Icon size="large" name="heart" /></>}
                {entry.healthCheckRating === HealthCheckRating.LowRisk && <><Icon size="large" name="heart" /><Icon size="large" name="heart" /><Icon size="large" name="heart" /><Icon size="large" name="heart outline" /></>}
                {entry.healthCheckRating === HealthCheckRating.HighRisk && <><Icon size="large" name="heart" /><Icon size="large" name="heart" /><Icon size="large" name="heart outline" /><Icon size="large" name="heart outline" /></>}
                {entry.healthCheckRating === HealthCheckRating.CriticalRisk && <><Icon size="large" name="heart" /><Icon size="large" name="heart outline" /><Icon size="large" name="heart outline" /><Icon size="large" name="heart outline" /></>}
              </List.Description>
            </List.Content>
          </>
        );
      case "OccupationalHealthcare":
        return(
          <>
            <Icon size="huge" name="stethoscope" />
            <List.Content>
              <List.Header>{entry.date} / {entry.employerName} -- Attended by: {entry.specialist}</List.Header>
              <List.Description>
                {entry.description}<br />
                {entry.sickLeave && <><br />Sickleave assigned: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</>}
                {entry.diagnosisCodes && <>{showDiagnosisList(entry.diagnosisCodes)}</>}
              </List.Description>
            </List.Content>
          </>
        );
      default:
        return assertNever(entry);
    }
  };

  const displayEntryList = () => {
    const entryList = patientDetails[patientId].entries;

    if (entryList !== undefined && entryList.length > 0) {
      return (
        <div>
          <Divider horizontal />
          <Container><h3>Entries:</h3></Container>
          <Divider horizontal />
          <List>
            {patientDetails[patientId].entries 
              && patientDetails[patientId].entries?.map(entry => 
              <List.Item style={{ margin: '1em 0 1em 0', border: 'solid', padding: '0.5em'}} key={entry.id}>{displayEntry(entry)}</List.Item>)
            }
          </List>
        </div>
      );
    } else {
      return (
        null
      );
    }
  };

  if (!patientDetails[patientId] || Object.keys(diagnosisData).length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Container>
          <h2 >{patientDetails[patientId].name}{displayGenderIcon()}</h2>
        </Container>
        <Divider />
        <Container>
          DoB: {patientDetails[patientId].dateOfBirth}<br />
          SSN: {patientDetails[patientId].ssn}<br />
          Occupation: {patientDetails[patientId].occupation}
        </Container>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>New HealthCheck Entry</Button>
        
        {displayEntryList()}
      </div>
    );
  }
};

export default PatientDetailsPage;