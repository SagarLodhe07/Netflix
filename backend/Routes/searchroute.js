import { deleteSearchHistory, getSearchHistory, searchMovie, searchPerson, searchTv } from "../Controller/searchController.js";
import express from 'express'
const searchRoute = express.Router();

searchRoute.get("/person/:query", searchPerson);
searchRoute.get("/movie/:query", searchMovie);
searchRoute.get("/tv/:query", searchTv);

searchRoute.get('/history',getSearchHistory)
searchRoute.delete('/history/:id',deleteSearchHistory)


export default searchRoute;