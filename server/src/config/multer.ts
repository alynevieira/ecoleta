import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// path ele vai utilizar o caminho na forma de cada sistema operacional
// multer é uma biblioteca para uploads de arquivos
// função filename do multer: nome para dar ao arquivo para não ter arquivo duplicado
// crypto gera hashs aleatorias / randomBytes quanto de carcter aleatorio / para hexadecimal

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex')

            const fileName = `${hash}-${file.originalname}`

            callback(null, fileName)
        }
    }),
};