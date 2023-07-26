import { object } from "joi";
import { ObjectId } from "mongodb";
import { Objet, User } from "../entities";
import { connection } from "./connection";

const collection = connection.db('objexchango').collection<Objet>('objet');
export const objetRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(objet:Objet) {
        const result = await collection.insertOne(objet);
        objet._id = result.insertedId;
        return objet;
    },
    
    // remove(_id:string) {
    //     return collection.deleteOne({_id:new ObjectId(_id)});
    // },
    // update(_id:string, object:Object) {
    //     return collection.updateOne({_id:new ObjectId(_id)}, {$set:object});
    // }
}
