export interface User {
    _id?:any;
    name:string;
    email:string;
    password:string;
}

export interface Objet {
    _id?:any;
    title:string;
    description:string;
    
    category:string;
    owner:{
        _id:any;
        name:string;
    };

}

export interface Borrow {
    _id?:any;
    borrowDate: Date;
    returnDate: Date;
    requestDate: Date;
    borrower:{
        _id:any;
        name:string;
    };
    objet:Objet;
    
}