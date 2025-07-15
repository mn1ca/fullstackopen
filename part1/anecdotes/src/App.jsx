import { useState } from 'react'

const Button = ({onclick, text}) => <button onClick={onclick}>{text}</button>

const MostVoted = ({anecdotes, votes}) => {
  
    const max = Math.max(...votes)
    const index = votes.indexOf(max)

    return (
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[index]}<br/>
        has {max} votes
      </div>
    )
    
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Uint8Array(8))
  const [selected, setSelected] = useState(0)
  
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    
    setVotes(newVotes)
  }

  const handleNext = () => {
    const min = 0
    const max = 7
    setSelected(Math.floor(Math.random() * (max - min + 1)) + min)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes <br/>
      <Button onclick={handleVote} text='vote'/>
      <Button onclick={handleNext} text='next anecdote'/>

      <MostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App