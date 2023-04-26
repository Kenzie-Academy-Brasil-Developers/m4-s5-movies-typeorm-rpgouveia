import { Router } from "express"
import { createMovieController } from "../controllers/movies.controllers"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { movieSchemaRequest } from "../schemas/movies.schemas"
import checkIfNameExists from "../middlewares/checkifNameExists.middleware"

const moviesRoutes: Router = Router()

moviesRoutes.post(
  "",
  checkRequestBodyData(movieSchemaRequest),
  checkIfNameExists,
  createMovieController
)

export default moviesRoutes
