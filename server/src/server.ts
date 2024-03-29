import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter } from "./user.routes";
import { apiDataRouter } from "./apiData.routes";
import { favTeamRouter } from "./favTeam.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

//attempt to connect to databse and create all collections
connectToDatabase(ATLAS_URI)
    .then(() => {
        //once connected the routers are connected to links ending in the collection's
        //name, this will send HTTP requests to desired routers based on the link
        const app = express();
        app.use(cors());
        app.use("/users", userRouter);
        app.use("/apiData", apiDataRouter);
        app.use("/favTeams", favTeamRouter);

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });

    })
    .catch(error => console.error(error));
