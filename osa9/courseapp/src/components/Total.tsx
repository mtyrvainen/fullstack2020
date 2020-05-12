import React from 'react';
import { TotalProps } from '../types';

const Total: React.FC<TotalProps> = ({ totalExercises }) => {
  return (
    <p>Number of exercises{" "}{totalExercises}</p>
  );
}

export default Total;