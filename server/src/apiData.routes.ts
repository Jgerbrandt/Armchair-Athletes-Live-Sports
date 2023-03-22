import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
//happy achievement mode :)

export const apiDataRouter = express.Router();
apiDataRouter.use(express.json());

// apiDataRouter.get("/", async (_req, res) => {
//     console.log("a user is requesting all apiData");
//     console.log("probably dont want this to be a thing.");
//     try {
//         const apiData = await collections.apiData.find({}).toArray();
//         res.status(200).send(apiData);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// apiDataRouter.get("/:id", async (req, res) => {
//     try {
//         console.log("\nin the api get (ID) one, ID:");
//         console.log("probably dont want this to be a thing.");
//         console.log(req?.params?.id);


//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const apiData = await collections.apiData.findOne(query);

//         if (apiData) {
//             res.status(200).send(apiData);
//         } else {
//             res.status(404).send(`Failed to find an apiData: ID ${id}`);
//         }
//     } catch (error) {
//         res.status(404).send(`Failed to find an apiData: ID ${req?.params?.id}`);
//     }
// });

apiDataRouter.get("/:flag", async (req, res) => {
    try {
        console.log("\nin the apiData get for follow:");
        console.log(req?.params?.flag);
        const flag = req?.params?.flag;

    } catch (error) {
        res.status(404).send(`Failed to find an apiData: flag ${req?.params?.flag}`);
    }
});

apiDataRouter.post("/", async (req, res) => {
    try {

        console.log("\nin the post (insert) apiData server side, body:");
        console.log(req.body);

        const apiData = req.body;
        const result = await collections.apiData.insertOne(apiData);
        if (result.acknowledged) {
            res.status(201).send(`Created a new apiData: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new apiData.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
