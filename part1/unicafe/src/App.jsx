import { useState } from 'react'

const Button = ({onclick, text}) => <button onClick={onclick}>{text}</button>

const TableData = ({text, data}) => <tr><td>{text}</td><td>{data}</td></tr>

const Statistics = ({feedback}) => {
  const total = feedback.good + feedback.neutral + feedback.bad

  if (total == 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  const average = (feedback.good - feedback.bad) / total
  const positive = (feedback.good / total) * 100 + ' %'
  
  return (
      <div>
        <h1>statistics</h1>
        <table><tbody>
            <TableData text='good' data={feedback.good}/>
            <TableData text='neutral' data={feedback.neutral}/>
            <TableData text='bad' data={feedback.bad}/>
            <TableData text='all' data={total}/>
            <TableData text='average' data={average}/>
            <TableData text='positive' data={positive}/>
       </tbody></table>
      </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleClick = (type) => {
    const update = () => {
        setFeedback({...feedback, [type]: feedback[type] + 1})
    }
    return update
}

  return (
    <div>
      <h1>give feedback</h1>
      <Button onclick={handleClick('good')} text='good' />
      <Button onclick={handleClick('neutral')} text='neutral' />
      <Button onclick={handleClick('bad')} text='bad' />
        
      <Statistics feedback={feedback}></Statistics>
    </div>
  )
}

export default App