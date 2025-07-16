import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import Input from './components/Input'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')

  const [ notification, setNotification ] = useState({type: '', message: ''})
  

  useEffect( () => {
    phonebookService.getAll().then((initialPersons) => { setPersons(initialPersons)})
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()

    // If person already exists in phonebook
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      
      if (existingPerson.number !== newNumber) {
        if (window.confirm(`${existingPerson.name} is already added to phonebook. Replace number?`)) {
          const updatedPerson = {...existingPerson, number: newNumber}

          phonebookService.update(updatedPerson).then((returnedPerson) => {
            setPersons(persons.map((person) => person !== existingPerson ? person : returnedPerson))
          })
          .catch(error => {
            setNotification (
            {type: 'error', message: `${existingPerson.name} has been deleted`}
          )
          setTimeout(() => {
            setNotification({type: null, message: null})
          }, 5000)

          setPersons(persons.filter((p) => p.id !== existingPerson.id))
          })

          // Notification
          setNotification (
            {type: 'success', message: `Changed ${existingPerson.name}'s number`}
          )
          setTimeout(() => {
            setNotification({type: null, message: null})
          }, 5000)
        }

      } else {
         setNotification (
            {type: 'error', message: `${existingPerson.name} is already in phonebook`}
          )
          setTimeout(() => {
            setNotification({type: null, message: null})
          }, 5000)
      }
      return
    }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    phonebookService.create(personObj).then((returnedPerson) => { 
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })

    // Notification
    setNotification(
          {type: 'success', message: `Added ${personObj.name} to phonebook`}
        )
    setTimeout(() => {
      setNotification({type: null, message: null})
    }, 5000)

  }


  const deletePerson = (id) => {

    const person = persons.find((p) => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deletePerson(id)
      setPersons(persons.filter((p) => p !== person))

      setNotification (
        {type: 'success', message: `${person.name} has been deleted`}
      )
      setTimeout(() => {
        setNotification({type: null, message: null})
      }, 5000)
  
    }
  }


  const personsToShow = (filter === '') ? 
  persons : persons.filter(person => {return person.name.toLowerCase().includes(filter.toLowerCase())})
  
  return (
    <div>
      
      <Notification type={notification.type} message={notification.message} />
      
      <h1>Phonebook</h1>
      <Filter value={filter} onchange={handleFilter} />

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>

        <Input type='name' value={newName} onchange={handleNameChange} />
        <Input type='number' value={newNumber} onchange={handleNumberChange} />
        
        <div>
          <button type="submit">add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App