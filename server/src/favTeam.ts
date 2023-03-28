import * as mongodb from "mongodb";

export interface FavTeam {
    userID: string;
    teamID: Number;
    _id?: mongodb.ObjectId;
}
