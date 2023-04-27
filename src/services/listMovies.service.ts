import { Repository } from "typeorm"
import { tMoviesListResponse } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { moviesListSchema } from "../schemas/movies.schemas"

const listMoviesService = async (): Promise<tMoviesListResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  const moviesList: Movie[] = await movieRepository.find()
  const movies: tMoviesListResponse = moviesListSchema.parse(moviesList)
  return movies
}

export default listMoviesService