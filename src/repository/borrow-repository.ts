import { Borrow } from "../entities";
import { connection } from "./connection";

const collection = connection.db('objexchango').collection<Borrow>('borrow');