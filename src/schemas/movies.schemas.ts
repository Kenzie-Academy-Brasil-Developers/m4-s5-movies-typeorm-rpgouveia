import { z } from "zod"

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().int().positive(),
  price: z.number().int().positive()
})
const moviesListSchema = z.array(movieSchema)
const movieUpdateSchema = movieSchema.partial()
const movieSchemaRequest = movieSchema.omit({ id: true })

export {
  movieSchema,
  movieSchemaRequest,
  moviesListSchema,
  movieUpdateSchema
}