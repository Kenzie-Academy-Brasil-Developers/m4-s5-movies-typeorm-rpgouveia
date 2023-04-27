import { z } from "zod"
import { movieSchema, movieSchemaRequest, moviesSchemaResponse } from "../schemas/movies.schemas"
import { DeepPartial } from "typeorm"

type tMovie = z.infer<typeof movieSchema>
type tMovieRequest = z.infer<typeof movieSchemaRequest>
type tMoviesResponse = z.infer<typeof moviesSchemaResponse>
type tMovieUpdateRequest = DeepPartial<tMovieRequest>

export {
  tMovie,
  tMovieRequest,
  tMoviesResponse,
  tMovieUpdateRequest
}