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
  
    findByEmail(email:string) {
        return collection.findOne({email});
    },
    async persist(user:User) {
        const result= await collection.insertOne(user);
        user._id = result.insertedId; //On assigne l'id auto-généré à l'user
        return user;
    }

    // remove(_id:string) {
    //     return collection.deleteOne({_id:new ObjectId(_id)});
    // },
    // update(_id:string, user:User) {
    //     return collection.updateOne({_id:new ObjectId(_id)}, {$set:user});
    // }
}