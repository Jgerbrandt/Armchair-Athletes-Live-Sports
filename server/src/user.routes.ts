import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
//happy achievement mode :)

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (_req, res) => {
    console.log("a user is requesting all users");
    try {
        const user = await collections.users.find({}).toArray();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        console.log("\nin the get (ID) one, ID:");
        console.log(req?.params?.id);


        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const user = await collections.users.findOne(query);

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(`Failed to find an user: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an user: ID ${req?.params?.id}`);
    }
});

//Ethan: Making my own user.routes function to get use by email and password :)
userRouter.get("/:email/:password", async (req, res) => {
    try {
        console.log("in email and pass");


        const email = req?.params?.email;
        const password = req?.params?.password;
        

        //here password is used a default search code to search by email alone
        if(password == "a1"){

            console.log(`in the login-check-user-get the code is ${password}`);

            const query = {
                email: email
            };
            const user = await collections
            .users.findOne(query);

            console.log(query);
            if (user) {
                console.log("found user:");
                console.log(user);
                res.status(200).send(user);
            } else {
                res.status(404).send(`Failed to find an user: EMAIL ${email}`);
            }

        } else { // no search code, search by email and pass

            console.log(`in the register-check-user-get the code is ${password}`);

            const query = {
                email: email,
                password: password
            };

            const user = await collections
            .users.findOne(query);

            //console.log("\nin the custome one, query:");
            // console.log("The user name and password entered are:");
            // console.log(email);
            // console.log(password);
            console.log(query);


            if (user) {
                console.log("found user:");
                console.log(user);
                res.status(200).send(user);
            } else {
                res.status(404).send(`Failed to find an user: EMAIL ${email}, PASSWORD ${password}`);
            }
        }
    } catch (error) {
        res.status(404).send(`Failed to find an user: EMAIL ${req?.params?.email}, PASSWORD ${req?.params?.password}`);
    }
});

userRouter.post("/", async (req, res) => {
    try {

        console.log("\nin the post(insert) server side, body:");
        console.log(req.body);

        const user = req.body;
        console.log("\n\n The insert is:~~~~~~~\n");
        console.log(user);
        console.log("~~~~~~~~~~\n\n");
        const result = await collections.users.insertOne(user);
        if (result.acknowledged) {
            res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new user.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

userRouter.put("/:id", async (req, res) => {
    try {
        console.log("\nin the put server side\nid then body:");
        console.log(req?.params?.id);
        console.log(req.body);

        const id = req?.params?.id;
        const user = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.users.updateOne(query, { $set: user });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an user: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an user: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an user: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.users.deleteOne(query);

        console.log("\nin the delete server side, id:");
        console.log(id);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an user: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an user: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an user: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
