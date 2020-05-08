interface ExerciseValues {
  targetAverage: number;
  dailyValues: Array<number>;
}

interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number; 
}

export const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments (target average and at least one day\'s average required)');
  
  const dailies: Array<number> = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Not all values are numbers!');
    }
    if (i !== 2) {
      dailies.push(Number(args[i]));
    }
  }

  return {
    targetAverage: Number(args[2]),
    dailyValues: dailies
  };
};

export const calculateExercises = (targetAverage: number, dailyValues: Array<number>): ExerciseStats => {
  const trainingDays: number = dailyValues.filter(a => a > 0).length;
  const average: number = dailyValues.reduce((a,b) => a + b, 0) / dailyValues.length;

  let rating: number, ratingDescription: string;

  if (average < targetAverage * 0.9) {
    ratingDescription = "Not Good";
    rating = 1;
  } else if (average > targetAverage * 1.1) {
    ratingDescription = "Very Good";
    rating = 3;
  } else {
    ratingDescription = "Just good enough";
    rating = 2;
  }

  return {
    periodLength: dailyValues.length,
    trainingDays: trainingDays,
    success: average >= targetAverage,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAverage,
    average: average    
  };
};

/*
try {
  const { targetAverage, dailyValues } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(targetAverage, dailyValues));
} catch (e) {
  console.log('Error, something went wrong, error message: ', e.message);
}
*/