# STOCKED

A quick and easy supply tracking app that lets users add, edit, delete inventory items

Live link: https://stocked-client.jclk86.now.sh

## Login

Username: Pip123
Password: Password123!

## Getting Started

Git clone this repo.
cd into folder.

### npm install

Install dependencies.

### npm start

Starts the application.

### npm run dev

Runs the app in the development mode.

### npm test

Launches the test runner.

## API

I created my own RESTful API to contain all of the inventory data created by my application.

### RESTful Endpoints

#### GET

Get all inventory items for specific user .../api/user/:user_id/inventory

Get all category tags .../api/tags

Get specific item belonging to specific user .../api/:user_id/inventory/:item_id

#### POST

Post user's login .../api/auth/login

Post new user .../api/register

#### DELETE

Delete specific item belonging to specific user .../api/:user_id/inventory/:item_id

#### PATCH

Patch specific item belonging to specific user .../api/:user_id/inventory/:item_id

## Motivation

This app was created to allow users to track their own unique inventory quickly and simply.

## Challenges

The primary challenge was ensuring endpoints were protected through effective implementation of middleware, more specifically in authentication, and authorization. This would allow proper security support to the client-end. Thus, for the fetch calls originating from the client end, JSON Web Tokens and bearer tokens were utilized in the middleware. Encrypting and hiding user information in the payload not only made the application more secure, but the JWT payload also aided in accessing specific user information, which was needed for many of the routes and in all of the components on the client end. For additional security measures, bcrypt was used to encrypt user passwords.

## Built With

React, Node.js, Express, JavaScript, PostgreSQL, CSS, Mocha, and Chai.
