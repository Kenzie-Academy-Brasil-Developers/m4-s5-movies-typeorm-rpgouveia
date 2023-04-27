import { Request, Response } from "express"
import { tMovie, tMovieRequest, tMoviesResponse } from "../interfaces/movies.interfaces"
import createMovieService from "../services/createMovie.service"
import listMoviesService from "../services/listMovies.service"
import updateMovieService from "../services/updateMovie.service"

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

const updateMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId: number = Number(request.params.id)
  const movieData = request.body
  const updatedMovie: tMovie = await updateMovieService(movieId, movieData)
  return response.json(updatedMovie)
}

export {
  createMovieController,
  listMoviesController,
  updateMovieController
}