import Knex from 'knex'
// os tipos não primitivos da linguagem começa com a letra maiuscula 

// é feita realizar as alterações no banco de dados
// tipo do knex: Knex = tem acesso aos metodos do Knex
// typescript consegue dizer um formato da variavel e consegue ganhar acesso a toda inteligencia da IDE
export async function up(knex: Knex) {
    // nome da tabela / freferencia da tabela para criar os campos
    return knex.schema.createTable('points', table => {
        // auto incremento
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
}

// deve ser utilizado para voltar atras, ou seja, deletar a tabela ou qualquer outra coisa que foi criada
export async function down(knex: Knex) {
    return knex.schema.dropTable('points')
}