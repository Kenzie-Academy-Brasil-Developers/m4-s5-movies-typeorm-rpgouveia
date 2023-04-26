import { Request, Response } from "express"
import { tMovie, tMovieRequest } from "../interfaces/movies.interfaces"
import createMovieService from "../services/createMovie.service"

const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: tMovieRequest = request.body
  const newMovie: tMovie = await createMovieService(movieData)
  return response.status(201).json(newMovie)
}

export {
  createMovieController
}