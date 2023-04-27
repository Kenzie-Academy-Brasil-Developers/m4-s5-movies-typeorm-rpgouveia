import { Repository } from "typeorm"
import { tMoviesResponse } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import AppDataSource from "../data-source"
import { moviesSchemaResponse } from "../schemas/movies.schemas"

const listMoviesService = async (): Promise<tMoviesResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  const moviesList: Movie[] = await movieRepository.find()
  const movies: tMoviesResponse = moviesSchemaResponse.parse(moviesList)
  return movies
}

export default listMoviesService