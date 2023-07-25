import { ObjectId } from "mongodb";
import { Borrow } from "../../entities";
import { connection } from "./connection";

const collection = connection.db('objexchango').collection<Borrow>('borrow');

export const borrowRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(borrow:Borrow) {
        const result = await collection.insertOne(borrow);
        borrow._id = result.insertedId;
        return borrow;
    },
    
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    update(_id:string, borrow:Borrow) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:borrow});
    }
}
