import { z } from "zod"
import { movieSchema, movieSchemaRequest } from "../schemas/movies.schemas"

type tMovie = z.infer<typeof movieSchema>
type tMovieRequest = z.infer<typeof movieSchemaRequest>

export {
  tMovie,
  tMovieRequest
}