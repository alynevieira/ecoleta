import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {

    async index(request: Request, response: Response) {
        // query quando lida com filtro é query
        // body criação
        // params quando está na rota, é obrigatorio

        const { city, uf, items } = request.query

        // como o itens é string, o split separa com a virgula 
        const parseItems = String(items)
            .split(',') // percorre cada item para tirar os espaçamentos dos lados (se houver)
                .map(item => Number(item.trim()))

        const points = await knex('points') // sempre que precisar filtrar itens de um ponto especifico, tem q fazer um join
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parseItems) // buscando todos os pontos que tem dentro o id passado na request
            .where('city', String(city)) // se a cidade é a que está recebendo
            .where('uf', String(uf)) // se o uf é a que está recebendo na request
            .distinct() // vai retornar pontos de coletas distintos (caso o ponto colete dois ou mais itens, p n mostrar um por vez)
            .select('points.*') // para buscar todos os dados da tabela points e não do join

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.66:3333/uploads/${point.image}`,
            }
        })
            
        return response.json(serializedPoints)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        // o first serve para retornar um unico registro e deixar a const point deixar de ser array
        const point = await knex('points').where('id', id).first()

        // se não for encontrado nenhum ponto
        if (!point) {
            return response.status(400).json({ message: 'Point not found.' })
        }

        const serializedPoints = {
            ...point,
            image_url: `http://192.168.1.66:3333/uploads/${point.image}`,
            
        }

        /**
         * SELECT items.title FROM items
         *  JOIN point_items ON items.id = point_items.item_id
         *  WHERE point_items.point_id = {id}
         */

        // vai passar todos os items que estão relacionado ao ponto
        const items = await knex('items')
        .join('point_items', 'items.id', '=', "point_items.item_id")
        .where('point_items.point_id', id)
        .select('items.title')

        return response.json({ point: serializedPoints, items })

    }

    async create(request: Request, response: Response) {
        // recurso de desestruturação do JS
        // como se fosse const name = request.body.name / const email = request.body.email 
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body
    
        // transaction
        const trx = await knex.transaction()
    
        // short sintax, quando o nome da variavel é igual ao nome da propriedade
        // name: name / email: email
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                }
        })
    
        await trx('point_items').insert(pointItems)

        // sempre que abre uma transação, precisa dar o commit antes do retorno para efetuar as inserções no banco
        await trx.commit()
    
        return response.json({
            id: point_id,
            ...point,
         })
    
    }

    async detail (request: Request, response: Response) {
        const { city, uf } = request.query

        // SELECT DISTINCT points.*, GROUP_CONCAT(items.title, ', ')
        // FROM points, items
        // JOIN point_items ON items.id = point_items.item_id
        // WHERE point_items.point_id = points.id
        // AND uf = 'SP'
        // AND city = 'Praia Grande'
        // GROUP BY points.id
        
        const points = await knex({ a: 'points', b: 'items' })
        .join('point_items', 'b.id', '=', 'point_items.item_id')
        .where('point_items.point_id', knex.raw('a.id'))
        .where('city', String(city))
        .where('uf', String(uf))
        .select('a.*', knex.raw('GROUP_CONCAT(b.title, ", ") as items'))
        .distinct()
        .groupBy('a.id')

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.66:3333/uploads/${point.image}`,
            }
        })

        return response.json({point: serializedPoints})

    }

}

export default PointsController