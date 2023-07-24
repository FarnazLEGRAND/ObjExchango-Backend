import 'dotenv/config';
import express from 'express';
import cors from 'cors';


const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());




app.listen(port, () => {
    console.log('Server is listening on http://localhost:'+port);
})