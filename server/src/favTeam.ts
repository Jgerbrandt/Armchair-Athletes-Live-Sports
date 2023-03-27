import * as mongodb from "mongodb";

export interface FavTeam {
    userID: string;
    teamID: string;
    _id?: mongodb.ObjectId;
}
