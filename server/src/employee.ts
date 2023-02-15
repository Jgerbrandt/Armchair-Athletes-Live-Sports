import * as mongodb from "mongodb";

export interface Employee {
    name: string;
    position: string;
    _id?: mongodb.ObjectId;
}
