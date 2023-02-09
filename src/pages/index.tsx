import { type NextPage } from "next";
import Head from "next/head";
import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { api } from "../utils/api";
import { env } from "../env/client.mjs";
import Image from "next/image";
import {
  DocumentChartBarIcon,
  InboxIcon,
  PhotoIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";

const useStripe = () => {
  const stripe = useMemo<Promise<Stripe | null>>(
    () => loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );

  return stripe;
};

const Home: NextPage = () => {
  const createCheckout = api.payment.createCheckout.useMutation();
  const stripePromise = useStripe();

  async function checkout() {
    const response = await createCheckout.mutateAsync();
    const stripe = await stripePromise;

    if (stripe !== null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center">
        <section className="container m-auto grid max-w-screen-lg grid-cols-2 items-center gap-20 pt-24">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl text-white">The Node CLI Mini Course</h1>

            <p className="text-xl font-normal text-white">
              Buy now to gain access to video content teaching you the basics of
              node, javascript, fetching from an api, reading and writing to
              files, and more by building 4 useful command line tools using
              Node.js.
            </p>

            <button
              className="rounded bg-gradient-to-r from-wdc-primary-darker to-blue-400 px-4 py-3 text-xl text-white hover:to-blue-500"
              onClick={() => {
                checkout().catch(console.error);
              }}
            >
              Purchase Now $1
            </button>
          </div>

          <Image
            width="400"
            height="400"
            className="m-auto"
            alt="a picture of a person at a computer"
            src="./programmer.svg"
          />
        </section>

        <section className="w-full pt-24 pb-4">
          <div className="container  m-auto grid max-w-screen-lg grid-cols-4 text-center text-white">
            <div>
              <Image
                src="/javascript.png"
                width="100"
                height="100"
                alt="javascript logo"
                className="m-auto invert"
              />
              Learn Javascript <br />
              Fundamentals
            </div>
            <div>
              <Image
                src="/node.png"
                width="100"
                height="100"
                alt="node logo"
                className="m-auto"
              />
              Node STD Lib
            </div>
            <div>
              <Image
                src="/npm.png"
                width="100"
                height="100"
                alt="npm logo"
                className="m-auto"
              />
              Use NPM
            </div>
            <div>
              <Image
                src="/vscode.png"
                width="100"
                height="100"
                alt="vscode logo"
                className="m-auto"
              />
              All in VSCode
            </div>
          </div>
        </section>

        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 100 1440 220"
        >
          <path
            fill="#2fdeed"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <section className="w-full bg-wdc-primary-darker pb-16">
          <div className="container m-auto max-w-screen-lg">
            <h2 className="mb-12 text-4xl font-bold">What We Will Build</h2>
            <div className="grid grid-cols-2 gap-12">
              <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <DocumentChartBarIcon className="m-auto mb-2 h-12 w-12 text-white" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  A CSV Parser
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Learn to read in csv files, parse them manually, extract data,
                  and write json to disk.
                </p>
              </div>
              <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <PuzzlePieceIcon className="m-auto mb-2 h-12 w-12 text-white" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Hangman CLI Game
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Learn to read in user input to play a game of hangman. Learn
                  to read from an API and create a basic game loop.
                </p>
              </div>
              <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <InboxIcon className="m-auto mb-2 h-12 w-12 text-white" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Emailer Tool
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Learn how to read in email templates and send them using
                  nodemailer.
                </p>
              </div>
              <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <PhotoIcon className="m-auto mb-2 h-12 w-12 text-white" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Image Scaling Tool
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Learn how to load in png files and scale them down to various
                  sizes using a third party library called imagemagick.
                </p>
              </div>
            </div>
          </div>
        </section>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
          <path
            fill="#2fdeed"
            fillOpacity="1"
            d="M0,0L1440,160L1440,0L0,0Z"
          ></path>
        </svg>

        <section className="w-full pb-16 text-white ">
          <div className="container m-auto max-w-screen-lg">
            <h2 className="mb-6 text-4xl font-bold">Why learn from Cody?</h2>
            <p className="text-xl">
              Cody has been working as a professional web developer in the
              industry since 2013. With a total of 10 years of experience, he
              can show you some of the best ways to write code and help you
              focus on the topics that are important.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
