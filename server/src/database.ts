import * as mongodb from "mongodb";
import { User } from "./user";
import { ApiData } from "./apiData";
import { Team } from "./teams"

//test
export const collections: {
    users?: mongodb.Collection<User>;
    apiData?: mongodb.Collection<ApiData>;
    team?: mongodb.Collection<Team>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("ArmChairAthletes");
    await applySchemaValidationUsers(db);
    await applySchemaValidationApiData(db);
    await applySchemaValidationTeam(db);

    const usersCollection = db.collection<User>("users+");
    collections.users = usersCollection;
    const apidDataCollection = db.collection<ApiData>("apiData");
    collections.apiData = apidDataCollection;
    const teamDataCollection = db.collection<Team>("team");
    collections.team = teamDataCollection;
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
                    pattern: "^\\S+@\\S+\\.\\S+$",
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
            required: ["ts", "flag", "json"],
            additionalProperties: false,
            properties: {
                _id: {},
                ts: {
                    bsonType: "string",
                    description: "'ts' is required and is a string"
                },
                flag: {
                    bsonType: "string",
                    description: "'flag' is required and is a string"
                },
                json: {
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

async function applySchemaValidationTeam(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["team_id", "user_id"],
            additionalProperties: false,
            properties: {
                _id: {},
                team_id: {
                    bsonType: "string",
                    description: "'team id' required and is a string",
                },
                user_id: {
                    bsonType: "string",
                    description: "'user id' is required and is a string",
                }
            },
        },
    };
    

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "team",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("team", {validator: jsonSchema});
        }
    });
}