import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');  
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (weight && height && !isNaN(Number(weight)) && !isNaN(Number(height))) {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const target = req.body.target;
  const dailyExercises = req.body.daily_exercises; 

  if (!target || !dailyExercises) {
    res.status(400).json({ error: 'parameters missing' });
  }
  
  if (isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  
  for (let i = 0; i < dailyExercises.length; i++) {
    if (isNaN(Number(dailyExercises[i]))) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  }
  
  try {
    const data = calculateExercises(target, dailyExercises); 
    res.status(200).json(data);
  } catch (e) {
    console.log('ERROR', e.message);
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

