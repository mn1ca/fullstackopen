const Person = ({person, deletePerson}) => {

    const findDelete = () => deletePerson(person.id)

    return (
        <div>{person.name} {person.number} <button onClick={findDelete}>delete</button></div>
    )
}


const Persons = ({personsToShow, deletePerson}) => 
<div>
    {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
</div>

export default Persons