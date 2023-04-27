import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { Movie } from "../entities"
import AppDataSource from "../data-source"
import { tMovieRequest } from "../interfaces/movies.interfaces"
import { AppError } from "../error"

const checkIfNameExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieData: tMovieRequest = request.body
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  const foundMovie: Movie | null = await movieRepository.findOne({
    where: {
      name: movieData.name
    }
  })
  if (foundMovie) {
    throw new AppError('Movie already exists.', 409)
  }
  return next()
}

export default checkIfNameExists