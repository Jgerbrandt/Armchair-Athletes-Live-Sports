import * as mongodb from "mongodb";

export interface Team {
    team_id: string;
    user_id: string;
    _id?: mongodb.ObjectId;
}
