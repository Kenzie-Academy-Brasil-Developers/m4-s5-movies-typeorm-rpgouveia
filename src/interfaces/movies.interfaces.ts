import { z } from "zod"
import { movieSchema, movieSchemaRequest, moviesListSchema } from "../schemas/movies.schemas"
import { DeepPartial } from "typeorm"

type tMovie = z.infer<typeof movieSchema>
type tMovieRequest = z.infer<typeof movieSchemaRequest>
type tMoviesListResponse = z.infer<typeof moviesListSchema>
type tMovieUpdateRequest = DeepPartial<tMovieRequest>

export {
  tMovie,
  tMovieRequest,
  tMoviesListResponse,
  tMovieUpdateRequest
}