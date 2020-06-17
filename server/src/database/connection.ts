import knex from 'knex'
import path from 'path'
// padroniza caminhos, dependendo do caminho que vier do sistema operacional

const connection = knex({
    client: 'sqlite3',
    connection: { // onde vamos amarzenar o arquivo do db ; variavel global, vai retornar o diretorio do arquivo que esta executando
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
})

export default connection;

// migrations é o historico/controle de versao para o banco de dados
// dentro da pasta migrations, a ordem dos arquivos é a ordem que é executada
// tomar cuidado para que tabelas dependentes de outras não seja feita em primeiro

// identificando entidades da app
// points (Pontos de coleta)
// --image
// --name
// --email
// --whatsapp
// --latitude
// --longitude (se for um ponto no mapa, é latitude e longitude)
// --city
// --uf
// items (Itens para coleta)
// --image
// --title
// point_items (relacionamento dos itens que um ponto coleta/tabela pivot/ M para M)
// --point_id
// --item_id