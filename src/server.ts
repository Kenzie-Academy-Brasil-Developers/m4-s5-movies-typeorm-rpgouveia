import app from "./app"
import { AppDataSource } from "./data-source"

const PORT: number = 3000

AppDataSource.initialize()
.then(() => {
  console.log('Database is connected')
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
})
.catch(error => console.error(error))