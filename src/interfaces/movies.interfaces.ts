import { z } from "zod"
import { movieSchema, movieSchemaRequest, moviesSchemaResponse } from "../schemas/movies.schemas"

type tMovie = z.infer<typeof movieSchema>
type tMovieRequest = z.infer<typeof movieSchemaRequest>
type tMoviesResponse = z.infer<typeof moviesSchemaResponse>

export {
  tMovie,
  tMovieRequest,
  tMoviesResponse
}