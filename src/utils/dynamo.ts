import { DynamoDB } from "aws-sdk";
import { env } from "../env/server.mjs";

export const client = new DynamoDB.DocumentClient({
  region: env.REGION,
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  endpoint: env.DYNAMO_ENDPOINT || undefined,
});
