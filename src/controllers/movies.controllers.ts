import { Request, Response } from "express"
import { tMovie, tMovieRequest, tMoviesPaginationRequest, tMoviesPaginationResponse } from "../interfaces/movies.interfaces"
import createMovieService from "../services/createMovie.service"
import listMoviesService from "../services/listMovies.service"
import updateMovieService from "../services/updateMovie.service"
import deleteMovieService from "../services/deleteMovie.service"

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
  const params: tMoviesPaginationRequest = request.query
  const movies: tMoviesPaginationResponse = await listMoviesService(params)
  return response.json(movies)
}

const updateMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId: number = Number(request.params.id)
  const movieData: tMovieRequest = request.body
  const updatedMovie: tMovie = await updateMovieService(movieId, movieData)
  return response.json(updatedMovie)
}

const deleteMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId: number = Number(request.params.id)
  await deleteMovieService(movieId)
  return response.status(204).send()
}

export {
  createMovieController,
  listMoviesController,
  updateMovieController,
  deleteMovieController
}