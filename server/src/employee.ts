import * as mongodb from "mongodb";

export interface Employee {
    name: string;
    position: string;
    level: "Regular" | "Premium" | "Admin";
    _id?: mongodb.ObjectId;
}
