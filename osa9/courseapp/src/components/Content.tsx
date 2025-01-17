import React from 'react';
import Part from './Part';
import { ContentProps } from '../types';

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(course => <Part key={course.name} coursePart={course} />)}
    </div>
  );
}

export default Content;