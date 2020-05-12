import express from 'express';
import patientService from '../services/patientService';
import { isString } from '../utils';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
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