import * as mongodb from "mongodb";

export interface ApiData {
    ts: string;
    flag: string;
    json: string;
    _id?: mongodb.ObjectId;
}
