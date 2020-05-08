interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescriptionCoursePartBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends DescriptionCoursePartBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends DescriptionCoursePartBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends DescriptionCoursePartBase {
  name: "Finalizing your final finals";
  finalGoodbye: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
