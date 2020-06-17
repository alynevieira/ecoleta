import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

// importar a conexão com o db
import PointsController from './controllers/PointsController'
import ItensConstroller from './controllers/ItemsController'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()
const itensController = new ItensConstroller()

// padrão da comunidade user index ao inves de lista
// index: listar / show: exibir / create: criar / update: alterar / delete: excluir

// listar todos os itens do db
routes.get('/items', itensController.index)
routes.get('/points', pointsController.index)

routes.get('/points/detail', pointsController.detail)

routes.get('/points/:id', pointsController.show)

routes.post('/points', upload.single('image'), pointsController.create)

// exportar ela para ter acesso a outros arquvivos
export default routes