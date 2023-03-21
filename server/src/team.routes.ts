import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
//happy achievement mode :)

export const teamRouter = express.Router();
teamRouter.use(express.json());

teamRouter.get("/", async (_req, res) => {
    console.log("a user is requesting all teams");
    try {
        const team = await collections.teams.find({}).toArray();
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

teamRouter.get("/:id", async (req, res) => {
    try {
        console.log("\nin the team get (ID) one, ID:");
        console.log(req?.params?.id);


        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const team = await collections.teams.findOne(query);

        if (team) {
            res.status(200).send(team);
        } else {
            res.status(404).send(`Failed to find an team: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an team: ID ${req?.params?.id}`);
    }
});

teamRouter.get("/:id/:code", async (req, res) => {
    try {
        console.log("\nin the team get for follow:");
        console.log(req?.params?.id);
        console.log(req?.params?.code);

        const id = req?.params?.id;
        const code = req?.params?.code;

    } catch (error) {
        res.status(404).send(`Failed to find an team: ID ${req?.params?.id}`);
    }
});

teamRouter.post("/", async (req, res) => {
    try {

        console.log("\nin the post (insert) team server side, body:");
        console.log(req.body);

        const team = req.body;
        const result = await collections.teams.insertOne(team);
        if (result.acknowledged) {
            res.status(201).send(`Created a new team: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new team.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
