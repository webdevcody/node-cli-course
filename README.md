# Overview

an example application which allows users to pay via stripe to get access to a single unlisted youtube video.

# Setup

These are the manual setup / deployment steps. I want to work on automating these soon:

- setup stripe
  - create a product and note PRICE_ID
  - create webhook and note STRIPE_WEBHOOK_SECRET
  - note NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - note STRIPE_SECRET_KEY
  - enable customer emails
- create amplify app using AWS dashboard
  - set all env variables
  - modify build settings to look like this
    ```
    build:
      commands:
        - env | grep -e NEXT_PUBLIC_ >> .env.production
        - env | grep -e STRIPE_SECRET_KEY >> .env.production
        - env | grep -e HOST_NAME >> .env.production
        - env | grep -e STRIPE_WEBHOOK_SECRET >> .env.production
        - env | grep -e PRICE_ID >> .env.production
        - env | grep -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY >> .env.production
        - env | grep -e TABLE_NAME >> .env.production
        - env | grep -e SECRET_ACCESS_KEY >> .env.production
        - env | grep -e ACCESS_KEY_ID >> .env.production
        - env | grep -e REGION >> .env.production
        - yarn run build
    ```
- domain
  - setup domain on amplify
  - create dns record to point to cloudfront

# How to Run

1. `yarn`
2. `yarn dev`
