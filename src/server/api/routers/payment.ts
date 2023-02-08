import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";
import { DynamoDB } from "aws-sdk";
import Stripe from "stripe";
import { env } from "../../../env/server.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new DynamoDB.DocumentClient({
  region: env.REGION,
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
});

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({
  isPaidEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const account = await client
        .get({
          TableName: env.TABLE_NAME,
          Key: {
            pk: `email|${input.email}`,
            sk: `email|${input.email}`,
          },
        })
        .promise();

      return {
        isValid: account.Item ? true : false,
      };
    }),
  createCheckout: publicProcedure.mutation(() => {
    return stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price: env.PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${env.HOST_NAME}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.HOST_NAME}/`,
    });
  }),
  getStripeSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return {
        email: session.customer_details?.email,
      };
    }),
});
