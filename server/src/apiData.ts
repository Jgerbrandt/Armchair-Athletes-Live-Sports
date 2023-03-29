import * as mongodb from "mongodb";

export interface ApiData {
    ts?: number; //milliseconds elapsed since the epoch, 
    //which is defined as the midnight at the beginning of January 1, 1970, UTC.

    flag: string; //flag identifies type of json data being stored from the API call
    
    json: string; //json text data taken from sports API

    _id?: mongodb.ObjectId; //primary mongo provided key
}
