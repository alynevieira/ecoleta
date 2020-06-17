import express from 'express'
import cors from 'cors' // install @types/cors -D
// eu só coloco ./ quando o arquivo é da minha aplicação, quando é do node modules, não precisa.
import routes from './routes'
import path from 'path'

// quando for devolver algo para o usuário usar o return para que nada que estiver embaixo seja executado

// request param: parametros que vem na propria rota que identifica um recurso
// query params: parametros que vem na propria rota, mas são opcionais como filtro, paginação etc
// request body: parametros para criação e atualização

// request obter dados da requisição
// response devolver a resposta pra quem estiver consumindo a rota

// a forma do express entender o corpo da requisição em formato JSON

// if e else exemple: const filteredUsers = search ? users.filter(user => user.includes(search)) : users

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333)