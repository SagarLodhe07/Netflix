import express from'express'
import { getMovieDetails, getMoviesByCategory, getSimilerMovies, getTrailers, getTrendingMovie } from '../Controller/movieController.js'

const movieRouter= express.Router()

movieRouter.get('/trending',getTrendingMovie)
movieRouter.get('/:id/trailers',getTrailers)
movieRouter.get('/:id/details',getMovieDetails)
movieRouter.get('/:id/similers',getSimilerMovies)
movieRouter.get('/:category',getMoviesByCategory)

export default movieRouter