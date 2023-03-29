import * as mongodb from "mongodb";
import { User } from "./user";
import { ApiData } from "./apiData";
import { FavTeam } from "./favTeam";

//list of mongo databases 
export const collections: {
    //users stores the user's email, password, and username
    users?: mongodb.Collection<User>;
    //apiData stors the api calls in the form of json data
    //this collection is used to reduce api calls when possible
    apiData?: mongodb.Collection<ApiData>;
    //favTeams this stores user's favorite teams, right now user's
    //can only have one favourite team but this db has potential to
    //scale to multiple favourites
    favTeams?: mongodb.Collection<FavTeam>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    //connect to the database
    const db = client.db("ArmChairAthletes");
    //ensure all the collections exist and match the schema
    await applySchemaValidationUsers(db);
    await applySchemaValidationApiData(db);
    await applySchemaValidationFavTeams(db);

    //connect the collections
    const usersCollection = db.collection<User>("users+");
    collections.users = usersCollection;
    const apidDataCollection = db.collection<ApiData>("apiData");
    collections.apiData = apidDataCollection;
    const favTeamsCollection = db.collection<FavTeam>("favTeams");
    collections.favTeams = favTeamsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidationUsers(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is a string",
                    minLength: 4
                },
                email:  {
                    description: "Email of the user",
                    bsonType: "string",
                    pattern: "^\\S+@\\S+\\.\\S+$", //regex pattern for email format
                    minLength: 6,
                    maxLength: 127
                }
            },
        },
    };
    

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "users+",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users+", {validator: jsonSchema});
        }
    });
}


async function applySchemaValidationApiData(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["flag", "json"],
            additionalProperties: false,
            properties: {
                _id: {},
                ts: { //timestamp for time sensitive apiData
                    bsonType: "number",
                    description: "'ts' is required and is a number"
                },
                flag: { //indicates the type of data being stored in json
                    bsonType: "string",
                    description: "'flag' is required and is a string"
                },
                json: { //json formatted data from sports api calls
                    bsonType: "string",
                    description: "'json' is required and is a string"
                }
            },
        },
    };
    

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "apiData",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("apiData", {validator: jsonSchema});
        }
    });
}

async function applySchemaValidationFavTeams(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["userID", "teamID"],
            additionalProperties: false,
            properties: {
                _id: {},
                userID: {
                    bsonType: "string",
                    description: "'userID' is required and is a string",
                },
                teamID: {
                    bsonType: "number",
                    description: "'teamID' is required and is a number",
                }
            },
        },
    };
    

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "favTeams",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("favTeams", {validator: jsonSchema});
        }
    });
}