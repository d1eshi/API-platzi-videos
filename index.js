const express = require('express')
const cors = require('cors')
const app = express()

// use uuid for generate id for each movie
const { v1: uuidv1 } = require('uuid')

// !impotant
app.use(cors())
// use the body parser
app.use(express.json())

let moviesMock = require('./movies')
const uuidOptions = require('./utils/uuid')

app.get('/', (req, res) => {
  res.send('<h1>Hello Tags</h1>')
})

app.get('/api/movies', (req, res) => {
  res.send(moviesMock)
})

app.get('/api/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = moviesMock.find(movie => movie.id === id)
  if (!movie) res.status(404).send('<h1>Movie not found</h1>')
  res.json(movie)
})

// create a route delete
app.delete('/api/movies/:id', (req, res) => {
  const id = req.params.id
  moviesMock = moviesMock.filter(movie => movie.id !== id)
  res.status(204).send('<h1>Movie deleted</h1>')
})

app.post('/api/movies', (req, res) => {
  const movie = req.body

  if (!movie || movie.title) {
    return res.status(400).send('<h1>Bad request</h1>')
  }

  const newMovie = {
    id: uuidv1(uuidOptions),
    title: movie.title,
    year: Number(movie.year),
    description: movie.description,
    duration: Number(movie.duration),
    contentRating: movie.contentRating || 'G',
    tags: movie.tags
  }

  moviesMock = [...moviesMock, newMovie]
  res.status(201).json(newMovie)
})

// app.put

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
