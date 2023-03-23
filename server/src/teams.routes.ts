import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
//happy achievement mode :)

export const teamRouter = express.Router();
teamRouter.use(express.json());

teamRouter.get("/", async (_req, res) => {
    console.log("a team is requesting all teams");
    try {
        const user = await collections.users.find({}).toArray();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

teamRouter.get("/:id", async (req, res) => {
    try {
        console.log("\nin the get (ID) one, ID:");
        console.log(req?.params?.id);

        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const team = await collections.team.findOne(query);

        if (team) {
            res.status(200).send(team);
        } else {
            res.status(404).send(`Failed to find a team: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a team: ID ${req?.params?.id}`);
    }
});

teamRouter.post("/", async (req, res) => {
    try {
        console.log("\nin the post(insert) server side, body:");
        console.log(req.body);

        const team = req.body;
        console.log("\n\n The insert is:~~~~~~~\n");
        console.log(team);
        console.log("~~~~~~~~~~\n\n");
        const result = await collections.team.insertOne(team);
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

teamRouter.put("/:id", async (req, res) => {
    try {
        console.log("\nin the put server side\nid then body:");
        console.log(req?.params?.id);
        console.log(req.body);

        const id = req?.params?.id;
        const team = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.team.updateOne(query, { $set: team });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a team: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a team: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a team: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

teamRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.team.deleteOne(query);

        console.log("\nin the delete server side, id:");
        console.log(id);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a team: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a team: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a team: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});