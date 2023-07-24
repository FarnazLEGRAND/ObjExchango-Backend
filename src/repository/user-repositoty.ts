import { ObjectId } from "mongodb";
import { User } from "../entities";
import { connection } from "./connection";

const collection = connection.db('objexchango').collection<User>('user');

export const userRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(user:User) {
        const result = await collection.insertOne(user);
        user._id = result.insertedId;
        return user;
    }
}