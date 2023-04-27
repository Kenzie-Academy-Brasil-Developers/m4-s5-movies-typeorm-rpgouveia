import { Request, Response } from "express"
import { tMovie, tMovieRequest, tMoviesResponse } from "../interfaces/movies.interfaces"
import createMovieService from "../services/createMovie.service"
import listMoviesService from "../services/listMovies.service"

const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: tMovieRequest = request.body
  const newMovie: tMovie = await createMovieService(movieData)
  return response.status(201).json(newMovie)
}

const listMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movies: tMoviesResponse = await listMoviesService()
  return response.json(movies)
}

export {
  createMovieController,
  listMoviesController
}