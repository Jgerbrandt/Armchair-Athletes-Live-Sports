import * as mongodb from "mongodb";

export interface User {
    username?: string;
    password?: string;
    _id?: mongodb.ObjectId;
}