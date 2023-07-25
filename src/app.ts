import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { userController } from './controller/user-controller';
import { objectController } from './controller/object-controller';
import { borrowController } from './controller/borrow-controller';

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userController);
app.use('/api/object', objectController);
app.use('/api/borrow', borrowController);

app.listen(port, () => {
    console.log('Server is listening on http://localhost:'+port);
})