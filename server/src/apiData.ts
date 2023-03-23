import * as mongodb from "mongodb";

export interface ApiData {
    ts?: number; //milliseconds elapsed since the epoch, 
    //which is defined as the midnight at the beginning of January 1, 1970, UTC.
    flag: string;
    json: string;
    _id?: mongodb.ObjectId;
}
