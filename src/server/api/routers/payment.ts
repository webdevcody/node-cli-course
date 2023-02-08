import { createTRPCRouter, publicProcedure } from "../trpc";

import Stripe from "stripe";
import { env } from "../../../env/server.mjs";
import { z } from "zod";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({
  createCheckout: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(({ input }) => {
      return stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "us_bank_account"],
        line_items: [
          {
            price: env.PRICE_ID,
            quantity: 1,
          },
        ],
        metadata: { email: input.email },
        success_url: `${env.HOST_NAME}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.HOST_NAME}/`,
      });
    }),
});
