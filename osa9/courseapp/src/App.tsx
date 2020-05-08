import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Finalizing your final finals",
      exerciseCount: 5,
      description: "Finalize your knowledge for the final finality.",
      finalGoodbye: "So long, and thanks for all the fish!"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;
