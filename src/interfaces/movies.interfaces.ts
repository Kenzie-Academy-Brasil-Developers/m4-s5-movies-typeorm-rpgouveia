import { z } from "zod"
import {
  movieSchema,
  movieRequestSchema,
  moviesListSchema,
} from "../schemas/movies.schemas"
import { DeepPartial } from "typeorm"

type tMovie = z.infer<typeof movieSchema>
type tMovieRequest = z.infer<typeof movieRequestSchema>
type tMoviesListResponse = z.infer<typeof moviesListSchema>
type tMovieUpdateRequest = DeepPartial<tMovieRequest>
type tMoviesPaginationRequest = {
  page?: number | undefined
  perPage?: number | undefined
  sort?: "id" | "price" | "duration" | undefined
  order?: "asc" | "desc" | undefined
}
type tMoviesPaginationResponse = {
  prevPage: string | null
  nextPage: string | null
  count: number
  data: tMoviesListResponse
}

export {
  tMovie,
  tMovieRequest,
  tMoviesListResponse,
  tMovieUpdateRequest,
  tMoviesPaginationRequest,
  tMoviesPaginationResponse,
}