import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { userController } from './controller/user-controller';
import { objetController } from './controller/objet-controller';
import { borrowController } from './controller/borrow-controller';

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

// comme ca on acces sur projet assets: localhost:8000/img/ObjExchango.jpg
app.use(express.static('assets'))

app.use('/api/user', userController);
app.use('/api/object', objetController);
app.use('/api/borrow', borrowController);

app.listen(port, () => {
    console.log('Server is listening on http://localhost:'+port);
})