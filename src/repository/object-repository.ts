import { connection } from "./connection";

const collection = connection.db('objexchango').collection<Object>('object');