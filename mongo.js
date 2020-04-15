const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://miljam:${password}@cluster0-2ypdj.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3], 
    number: process.argv[4],
    id: Math.floor(Math.random()*Math.floor(666)),
})


if (process.argv[3]===undefined && process.argv[4]===undefined) {
  console.log("puhelinluettelo:")
  Person
  .find({})
  .then(result=> {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

else {
  person.save().then(response => {
    console.log('adding', person.name, person.number, 'to the database')
    mongoose.connection.close()
  })
}

