import express from'express'
import { getSimilerTvs, getTrendingTvs, getTVDetails, getTvsByCategory, getTvTrailers } from '../Controller/tvController.js'

const tvRouter = express.Router()

tvRouter.get('/trending',getTrendingTvs)
tvRouter.get('/:id/trailers',getTvTrailers)
tvRouter.get('/:id/details',getTVDetails)
tvRouter.get('/:id/similers',getSimilerTvs)
tvRouter.get('/:category',getTvsByCategory)

export default tvRouter