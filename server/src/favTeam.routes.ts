import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
import { FavTeam } from "./favTeam";
//happy achievement mode :)

export const favTeamRouter = express.Router();
favTeamRouter.use(express.json());

//need to convert this to only get all favourties basedd on userID returna array like user list
favTeamRouter.get("/:id", async (req, res) => {
    try {
        console.log("\nin the get (ID) one, ID:");
        console.log(req?.params?.id);


        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const favTeam = await collections.favTeams.findOne(query);

        if (favTeam) {
            res.status(200).send(favTeam);
        } else {
            res.status(404).send(`Failed to find an favTeam: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an favTeam: ID ${req?.params?.id}`);
    }
});

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

favTeamRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.favTeams.deleteOne(query);

        console.log("\nin the delete server side, id:");
        console.log(id);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an favTeam: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an favTeam: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an favTeam: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
