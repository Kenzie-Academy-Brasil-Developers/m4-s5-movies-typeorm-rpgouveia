import { z } from "zod"

const movieSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  duration: z.number(),
  price: z.number()
})
const moviesListSchema = z.array(movieSchema)
const movieSchemaRequest = movieSchema.omit({ id: true })

export {
  movieSchema,
  movieSchemaRequest,
  moviesListSchema
}