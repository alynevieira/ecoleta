import path from 'path'

// aqui vai ter configurações que a config com o banco não tem
// export default não é suportado pelo knex
module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
}

// npx knex migrate:latest --knexfile knexfile.ts migrate:latest para executar e criar o banco e as migrations
// se sucesso, foi criado o arquivo database.sqlite na pasta