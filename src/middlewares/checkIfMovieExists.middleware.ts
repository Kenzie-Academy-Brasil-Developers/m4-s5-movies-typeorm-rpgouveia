import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { AppError } from "../error"

const checkIfMovieExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId: number = Number(request.params.id)
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  const foundMovie: Movie | null = await movieRepository.findOne({
    where: {
      id: movieId
    }
  })
  if (!foundMovie) {
    throw new AppError('Movie not found', 404)
  }
  return next()
}

export default checkIfMovieExists