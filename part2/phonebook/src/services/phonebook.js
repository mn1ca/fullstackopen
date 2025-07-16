import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = (newPerson) => axios.post(baseURL, newPerson).then(response => response.data)

const deletePerson = (person) => axios.delete(`${baseURL}/${person}`).then(response => response.data)

const update = (person) => axios.put(`${baseURL}/${person.id}`, person).then(response => response.data)

export default {
    getAll,
    create,
    deletePerson,
    update
}