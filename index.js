const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let persons = [
    {
        name: "Arto Liedes",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-654321",
        id: 2
    },
    {
        name: "Arto Mäkijärvi",
        number: "050-666169",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "02-555666",
        id: 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Contact list</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => {
        return person.id === id
    })
    if (person) {    
        response.json(person)  
    } else {    
        response.status(404).end()
    }
    console.log(person)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    console.log("person deleted")
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
      const person = request.body
      console.log(person)

      person.id = Math.floor(Math.random()*Math.floor(666))

      if(person.name === undefined){
        return response.status(400).json({
            error: 'name missing'
        })
      }
      

      if(person.number === undefined){
          return response.status(400).json({
              error: 'number missing'
          })
      }

      else {
        persons = persons.concat(person)
        console.log("person added")
        response.json(person)
      }

  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('maybe works')
})
