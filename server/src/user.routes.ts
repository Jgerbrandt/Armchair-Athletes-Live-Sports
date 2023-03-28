import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

//express router will recive http calls from the client side with
export const userRouter = express.Router();
userRouter.use(express.json());

//this function is used to get all the users THIS WILL BE REMOVED IN THE FINAL VERSION
// userRouter.get("/", async (_req, res) => {
//     //console.log("a user is requesting all users");
//     try {
//         const user = await collections.users.find({}).toArray();
//         res.status(200).send(user);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

//this function will get a user's information bsaed on their mongo ID (primary key)
userRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        //create a query that searches by ID
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

//this function tries to get a user with login information, email and password
userRouter.get("/:email/:password", async (req, res) => {
    try {

        const email = req?.params?.email;
        const password = req?.params?.password;
        
        //here password is used a default search code to search by email alone
        //this is used for when a user is registering to ensure their email is
        //not already being used by another account.
        if(password == "a1"){
            //create a query to search by email
            const query = {
                email: email
            };
            const user = await collections
            .users.findOne(query);
            //if we find a user we send a positive search so they are unable
            //to create another account with this email
            if (user) {
                res.status(200).send(user);
            } else {
                //if we don't find the user we allow the user to be created
                res.status(404).send(`Failed to find an user: EMAIL ${email}`);
            }
        } else { // no search code, search by email and pass
            //create a query for login to test if information matches an account
            const query = {
                email: email,
                password: password
            };
            const user = await collections
            .users.findOne(query);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send(`Failed to find an user`);
            }
        }
    } catch (error) {
        res.status(404).send(`Failed to find an user`);
    }
});

//this function will create a user when a user registers
userRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
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


//this function is used to get all the users THIS WILL BE REMOVED IN THE FINAL VERSION
// userRouter.put("/:id", async (req, res) => {
//     try {
//         console.log("\nin the put server side\nid then body:");
//         console.log(req?.params?.id);
//         console.log(req.body);

//         const id = req?.params?.id;
//         const user = req.body;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.users.updateOne(query, { $set: user });

//         if (result && result.matchedCount) {
//             res.status(200).send(`Updated an user: ID ${id}.`);
//         } else if (!result.matchedCount) {
//             res.status(404).send(`Failed to find an user: ID ${id}`);
//         } else {
//             res.status(304).send(`Failed to update an user: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
// });

//this function deletes a user based on their mongo identifier
userRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.users.deleteOne(query);


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
