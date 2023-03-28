import * as express from "express";
import * as mongodb from "mongodb";
import { ApiData } from "./apiData";
import { collections } from "./database";

//express router will recive http calls from the client side with
export const apiDataRouter = express.Router();
apiDataRouter.use(express.json());

//this function will get API data that is stored in the armChairAthlete DB 
//based on what the flag is
apiDataRouter.get("/:flag", async (req, res) => {
    try {
        //flag identifies the data being stored
        const flag = req?.params?.flag;

        if(flag == "teams"){
            //search for the teams data
            const query = {
                flag: flag
            };
            const apiData = await collections
            .apiData.findOne(query);
            //if we find the data we will not need to make any API calls
            //otherwise the client side will make an API call and we will
            //store that later
            if (apiData) {
                res.status(200).send(apiData);
            } else {
                res.status(404).send(`Failed to find an apiData: flag ${flag}`);
            }
        }
    } catch (error) {
        res.status(404).send(`Failed to find an apiData: flag ${req?.params?.flag}`);
    }
});

//this function will store the API data in the form of json text
//the data is identified by a flag, a timestamp is also saved for
//time sensitive data like standings (daily) or game (15 second basis)
apiDataRouter.post("/", async (req, res) => {
    try {
        let apiData: ApiData
        apiData = req.body;
        apiData.ts = Date.now();
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
