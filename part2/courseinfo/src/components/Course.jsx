
const Part = ({part}) => <div>{part.name} {part.exercises}</div>

const Course = ({course}) => {

  const total = course.parts.reduce(
    (sum, part) => sum + part.exercises, 0, )

  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
      total of {total} exercises
    </div>
  )
}

export default Course