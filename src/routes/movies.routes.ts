import { Router } from "express"
import { createMovieController, deleteMovieController, listMoviesController, updateMovieController } from "../controllers/movies.controllers"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { movieSchemaRequest } from "../schemas/movies.schemas"
import checkIfNameExists from "../middlewares/checkifNameExists.middleware"
import checkIfMovieExists from "../middlewares/checkIfMovieExists.middleware"

const moviesRoutes: Router = Router()

moviesRoutes.post(
  "",
  checkRequestBodyData(movieSchemaRequest),
  checkIfNameExists,
  createMovieController
)
moviesRoutes.get(
  "",
  listMoviesController
)
moviesRoutes.patch(
  "/:id",
  checkIfMovieExists,
  checkIfNameExists,
  updateMovieController
)
moviesRoutes.delete(
  "/:id",
  checkIfMovieExists,
  deleteMovieController
)

export default moviesRoutes
