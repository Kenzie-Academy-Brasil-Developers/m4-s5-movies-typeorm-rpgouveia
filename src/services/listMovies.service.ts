import { Repository } from "typeorm"
import { tMoviesListResponse, tMoviesPaginationRequest, tMoviesPaginationResponse } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { moviesListSchema } from "../schemas/movies.schemas"

const listMoviesService = async (
  params: tMoviesPaginationRequest,
  baseUrl: string
  ): Promise<tMoviesPaginationResponse> => {
  // Definição do repositório
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  
  // Formulação da Paginação
  // Declarações de variáveis
  let page: number = Number(params.page) 
  let perPage: number = Number(params.perPage)
    
  // Validação para números positivos e maiores que 5
  if (perPage <= 0 || perPage > 5 || isNaN(perPage)) {
    perPage = 5
  }
  // Validação para números positivos, número inteiro
  if (page <= 0 || isNaN(page)) {
    page = 1
  }
  
  // Configuração da paginação
  const limit: number = perPage
  const offset: number = (page - 1) * perPage
  
  // Configuração da ordenação
  let sort = params.sort || "id"
  let order = params.order || "asc"
  
  // Lógica para Listagem de Filmes
  const moviesList: Movie[] = await movieRepository.find({
    skip: offset,
    take: limit,
    order: {
      [sort]: order
    }
  })
  
  // Formulação do Retorno
  // Quantidade de itens na busca
  const movies: tMoviesListResponse = moviesListSchema.parse(moviesList)
  const quantity = movies.length
  
  // Quantidade total de items do Banco de Dados
  const totalQuantity:  number = await movieRepository.count()
  // Verificar quantidade máxima de paginas
  const maximumPageNumber: number = totalQuantity / perPage
  
  // Formulação das URLs
  const prevPage =
    page > 1
      ? `${baseUrl}?page=${page - 1}&perPage=${perPage}`
      : null
  const nextPage =
    page < maximumPageNumber
      ? `${baseUrl}?page=${page + 1}&perPage=${perPage}`
      : null

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: quantity,
    data: movies
  }
}

export default listMoviesService