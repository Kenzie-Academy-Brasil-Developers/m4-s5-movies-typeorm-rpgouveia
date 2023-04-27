import { Repository } from "typeorm"
import { tMovie, tMovieUpdateRequest } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import AppDataSource from "../data-source"
import { movieSchema } from "../schemas/movies.schemas"

const updateMovieService = async (
  movieId: number,
  movieData: tMovieUpdateRequest
): Promise<tMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  const oldMovieData: Movie | null = await movieRepository.findOneBy({
    id: movieId
  })
  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData
  })
  await movieRepository.save(newMovieData)
  const updatedMovie: tMovie = movieSchema.parse(newMovieData)
  return updatedMovie
}

export default updateMovieService