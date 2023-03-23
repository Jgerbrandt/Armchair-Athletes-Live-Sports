import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter } from "./user.routes";
import { apiDataRouter } from "./apiData.routes";
import { teamRouter } from "./teams.routes";
import { collections } from './database' ;

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/users", userRouter);
        app.use("/apiData", apiDataRouter);
        app.use("/team", teamRouter);

        app.get('/teams', (req, res) => {
            collections.team.find().toArray()
              .then((teams) => {
                res.json(teams);
              })
              .catch((err) => {
                console.error(err);
                res.sendStatus(500);
              });
        });
          
        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });

    })
    .catch(error => console.error(error));
