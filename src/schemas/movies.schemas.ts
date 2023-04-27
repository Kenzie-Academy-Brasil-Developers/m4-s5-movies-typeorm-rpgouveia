import { z } from "zod"

const movieSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  duration: z.number(),
  price: z.number()
})

const movieSchemaRequest = movieSchema.omit({ id: true })
const moviesSchemaResponse = z.array(movieSchema)

export {
  movieSchema,
  movieSchemaRequest,
  moviesSchemaResponse
}