const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const Person = require('./models/person')

app.get('/', (request, response) => {
    response.send('<h1>Contact list</h1>')
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
})

  app.delete('/api/persons/:id', (request, response) => {
    Person
    .findByIdAndRemove(request.params.id).then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })

  })

  app.post('/api/persons', (request, response) => {
      const body = request.body

      body.id = Math.floor(Math.random()*Math.floor(666))

      if(body.name === undefined){
        return response.status(400).json({
            error: 'name missing'
        })
      }
      

      if(body.number === undefined){
          return response.status(400).json({
              error: 'number missing'
          })
      }

      else {
        const person = new Person({
            name: body.name, 
            number: body.number,
            id: Math.floor(Math.random()*Math.floor(666)),
        })
        person.save().then(savedPerson => {
            response.json(savedPerson.toJSON())
          })
      }

  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('running server')
})
