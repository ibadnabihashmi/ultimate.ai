## Architecture

The architecture is composed of two services (service-one) which talks to chat api to get the intents for a message and (service-two) which sends back the message if asked for an intent, the servicee-one sends an intent to service-two, service-two then reads database and sends a random message saved for the provided intent

## Pre-requisites

Makes sure nodejs and mongodb are installed on your machine

## How to run the services

change directory to the two services one after other and install dependencies

```
cd service-one
npm i
```

```
cd service-two
npm i
```

then open the services in separate tabs in terminal and start them with following command

`npm run start:dev`

to run the test

`npm run test`

for e2e tests

`npm run test:e2e`

## API Documentation

The API documentation is available via Swagger, point to the following route to see it, also the yaml file is available in respective directories

http://localhost:3001/api and http://localhost:3002/api

TODO:
write e2e tests for service-two, unit tests are there but there was a problem creating test database for service-two
