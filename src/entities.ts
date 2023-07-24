export interface User {
    _id?:any;
    name:string;
    email:string;
    password:string;
}

export interface Object {
    _id?:any;
    title:string;
    description:string;
    category:string;
    owner:User;
}

export interface Borrow {
    _id?:any;
    borrowDate: Date;
    returnDate: Date;
    requestDate: Date;
    borrower:User;
    object:Object;
    
}