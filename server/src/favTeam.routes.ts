import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
import { FavTeam } from "./favTeam";

//express router will recive http calls from the client side with
export const favTeamRouter = express.Router();
favTeamRouter.use(express.json());

//this function will get the user's favourite team information
//based on what the logged in user's ID
favTeamRouter.get("/:userID", async (req, res) => {
    try {
        const userID = req?.params?.userID;
        //create a query that searches for stored information about
        //the users favourite team
        const query = { userID: userID };
        const favTeam = await collections.favTeams.findOne(query);

        if (favTeam) {
            res.status(200).send(favTeam);
        } else {
            res.status(404).send(`Failed to find an favTeam: userID ${userID}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an favTeam: userID ${req?.params?.userID}`);
    }
});

//this function will remove the users previously saved favourite team
//data if they have saved on before, then it will store their new favourited team
favTeamRouter.post("/", async (req, res) => {
    try {
        //here we try to delete the users favorite team so we can replace it
        const query = { userID: req.body.userID};
        await collections.favTeams.deleteOne(query);

        //then we build a new favourite team containing the new team and user id
        let favTeam: FavTeam;
        favTeam = {teamID: req.body.teamID, userID: req.body.userID};
        const result = await collections.favTeams.insertOne(favTeam);

        //once done we send a response message back to the client side
        if (result.acknowledged) {
            res.status(201).send(`Created a new favTeam: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new favTeam.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
