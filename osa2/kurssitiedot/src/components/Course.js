import React from 'react'

const Course = ({ course }) => {
    return (    
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const Header = ({ header }) => <h2>{header}</h2>
  
const Content = ({ parts }) => {
    return(
      <div>
          {parts.map(part => 
            <Part key={part.id} partName={part.name} exercises={part.exercises} />
            )}
            <Total parts={parts} />
      </div>
    )
}
  
const Part = ({partName, exercises}) => <p>{partName} {exercises}</p>
  
const Total = ({ parts }) => {
    const totalExercises = parts.reduce((total, part) => {
        return total + part.exercises
    }, 0)

    return (
        <p><b>Total of {totalExercises} exercises</b></p>
    )
}

export default Course