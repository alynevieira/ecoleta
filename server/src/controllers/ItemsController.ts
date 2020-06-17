import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController {
    async index(request: Request, response: Response) {
        // sempre que for utilizar uma query do db, precisa do await na 
        // frente para ele terminar e então ter os resultados, e precisa ter um async na rota
        const items = await knex('items').select('*')
        
        // quando tem informações do banco que não está da maneira que deveria retornar ao cliente
        // o processo de transformar essas informações, se chama serelização de dado
        // eu transformo os dados para um novo formato que vai ser mais acessível a quem está requisitando as informações
        const serializedItems = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.66:3333/uploads/${item.image}`
            } // exp://192.168.1.66:19000 conexão mobile
        }) // http://localhost:3333/ coneção web 
        // map percorre todos os itens do meu db e eu posso alterar eles da maneira que eu quiser
    
        return response.json(serializedItems)
    }
}

export default ItemsController