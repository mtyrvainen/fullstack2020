import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  /**
  * Helper function for exhaustive type checking
  */
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (coursePart.name) {
    case 'Fundamentals':
      return(
        <div>
          <p>
          {coursePart.name}<br />
          Exercises:{' '}{coursePart.exerciseCount}<br />
          {coursePart.description}
          </p>
        </div>
      );
    case 'Using props to pass data':
      return(
        <div>
          <p>
          {coursePart.name}<br />
          Exercises:{' '}{coursePart.exerciseCount}<br />
          Group Projects:{' '}{coursePart.groupProjectCount}
          </p>
        </div>
      );
    case 'Deeper type usage':
      return(
        <div>
          <p>
          {coursePart.name}<br />
          Exercises:{' '}{coursePart.exerciseCount}<br />
          {coursePart.description}<br />
          Exercise submissions:{' '}{coursePart.exerciseSubmissionLink}
          </p>
        </div>
      );
    case 'Finalizing your final finals':
      return(
        <div>
          <p>
          {coursePart.name}<br />
          Exercises:{' '}{coursePart.exerciseCount}<br />
          {coursePart.description}<br />
          Final goodbye:{' '}{coursePart.finalGoodbye}
          </p>
        </div>
      );
    default:
        return assertNever(coursePart);
  }
}

export default Part;