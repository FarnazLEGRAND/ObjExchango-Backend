import { object } from "joi";
import { ObjectId } from "mongodb";
import { User } from "../entities";
import { connection } from "./connection";

const collection = connection.db('objexchango').collection<Object>('object');
export const objectRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(object:User) {
        const result = await collection.insertOne(object);
        object._id = result.insertedId;
        return object;
    }
}