import * as mongodb from "mongodb";

export interface FavTeam {
    userID: string; //mongo ID of the user object of the user
    //who favourited a team

    teamID: Number; //team id of the favourite team
    //assigned by the sports API 

    _id?: mongodb.ObjectId; //primary mongo provided key
}
