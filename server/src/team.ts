import * as mongodb from "mongodb";

export interface Team {
    sport: string;
    teamName: string;
    _id?: mongodb.ObjectId;
}
