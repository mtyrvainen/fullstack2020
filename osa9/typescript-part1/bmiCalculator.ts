interface BmiValues {
  height: number;
  weight: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments (height and weight required)');
  if (args.length >4) throw new Error('Too meny arguments (only height and weight required)');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Height and weight values not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height * height * 0.0001);

  if (bmi < 15) {
    return ('Very severely underweight');
  } else if (bmi >= 15 && bmi < 16) {
    return ('Severely underweight');
  } else if (bmi >= 16 && bmi < 18.5) {
    return ('Underweight');
  } else if (bmi >= 18.5 && bmi < 25) {
    return ('Normal (healthy weight)');
  } else if (bmi >= 25 && bmi < 30) {
    return ('Overweight');
  } else if (bmi >= 30 && bmi < 35) {
    return ('Obese Class I (Moderately obese)');
  } else if (bmi >= 35 && bmi < 40) {
    return ('Obese Class II (Severely obese)');
  } else {
    return ('Obese Class III (Very severely obese)');
  }
};

/*
try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something went wrong, error message: ', e.message);
}
*/