import { Repository } from "typeorm"
import { tMovie, tMovieRequest } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { movieSchema } from "../schemas/movies.schemas"

const createMovieService = async (
  movieData: tMovieRequest
): Promise<tMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  const createdMovie: Movie =  movieRepository.create(movieData)
  await movieRepository.save(createdMovie)
  const movie: tMovie = movieSchema.parse(createdMovie)
  return movie
}

export default createMovieService