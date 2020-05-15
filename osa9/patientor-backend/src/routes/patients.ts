import express from 'express';
import patientService from '../services/patientService';
import { isString, toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryForPatient(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const requestId = req.params.id;

  if (requestId && isString(requestId)) {
    const result = patientService.getPatientById(requestId);

    result ? res.json(result) : res.status(404).send();
  } else {
    res.status(400).send('Bad ID');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;