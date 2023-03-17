import * as mongodb from "mongodb";

export interface User {
    username: string;
    password: string;
    email: string;
    _id?: mongodb.ObjectId;
}
