import * as mongodb from "mongodb";
import { User } from "./user";
import { Team } from "./team";
//test
export const collections: {
    users?: mongodb.Collection<User>;
    teams?: mongodb.Collection<Team>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("ArmChairAthletes");
    await applySchemaValidationUsers(db);
    await applySchemaValidationTeams(db);

    const usersCollection = db.collection<User>("users+");
    collections.users = usersCollection;
    const teamsCollection = db.collection<Team>("teams");
    collections.teams = teamsCollection;
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


async function applySchemaValidationTeams(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["sport", "teamName"],
            additionalProperties: false,
            properties: {
                _id: {},
                sport: {
                    bsonType: "string",
                    description: "'sport' is required and is a string",
                },
                teamName: {
                    bsonType: "string",
                    description: "'teamName' is required and is a string",
                    minLength: 4
                }
            },
        },
    };
    

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "teams",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("teams", {validator: jsonSchema});
        }
    });
}