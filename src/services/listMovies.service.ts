import { Repository } from "typeorm"
import { tMoviesListResponse, tMoviesPaginationRequest, tMoviesPaginationResponse } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { moviesListSchema } from "../schemas/movies.schemas"

const listMoviesService = async (
  params: tMoviesPaginationRequest
  ): Promise<tMoviesPaginationResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  let page: number = Number(params.page) 
  let perPage: number = Number(params.perPage)
  if (perPage <= 0 || perPage > 5 || isNaN(perPage)) {
    perPage = 5
  }
  if (page <= 0 || isNaN(page)) {
    page = 1
  }
  const limit: number = perPage
  const offset: number = (page - 1) * perPage
  let sort = params.sort
  let order = params.order || "asc"
  let moviesList: Movie[]
  if (!sort) {
    moviesList = await movieRepository.find({
      skip: offset,
      take: limit,
    })
  } else {
    moviesList = await movieRepository.find({
      skip: offset,
      take: limit,
      order: {
        [sort]: order
      }
    })
  }
  const movies: tMoviesListResponse = moviesListSchema.parse(moviesList)
  const totalQuantity:  number = await movieRepository.count()
  const maximumPageNumber: number = Math.ceil(totalQuantity / perPage)
  const baseUrl: string = "http://localhost:3000/movies"
  const prevPage =
    page > 1
      ? `${baseUrl}?page=${page - 1}&perPage=${perPage}`
      : null
  const nextPage =
    page < maximumPageNumber
      ? `${baseUrl}?page=${page + 1}&perPage=${perPage}`
      : null
  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: totalQuantity,
    data: movies
  }
}

export default listMoviesService