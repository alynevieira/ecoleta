import Knex from 'knex'
// os tipos não primitivos da linguagem começa com a letra maiuscula 

// é feita realizar as alterações no banco de dados
// tipo do knex: Knex = tem acesso aos metodos do Knex
// typescript consegue dizer um formato da variavel e consegue ganhar acesso a toda inteligencia da IDE
export async function up(knex: Knex) {
    // nome da tabela / freferencia da tabela para criar os campos
    return knex.schema.createTable('point_items', table => {
        // auto incremento
        table.increments('id').primary()

        // o campo point_id vai criar uma chave estrangeira no tabela points no campo id
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points')

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items')
    })
}

// deve ser utilizado para voltar atras, ou seja, deletar a tabela ou qualquer outra coisa que foi criada
export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items')
}