import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part partName={props.courseParts[0].name} exercises={props.courseParts[0].exercises} />
      <Part partName={props.courseParts[1].name} exercises={props.courseParts[1].exercises} />
      <Part partName={props.courseParts[2].name} exercises={props.courseParts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.partName} {props.exercises}</p>
  )
}

const Total = (props) => {
  return(
  <p>Number of exercises {props.courseParts[0].exercises + props.courseParts[1].exercises + props.courseParts[2].exercises}</p>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))