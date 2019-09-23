# STOCKED

A quick and easy supply tracking app that lets users add, edit, delete inventory items

<!-- links and login info -->

## Login

Username: Pip123
Password: Password123!

## Getting Started

### npm start

Starts the application.

### npm run dev

Runs the app in the development mode.

<!-- Server listens ADD LINK TO HEROKU to view it in the browser. -->

### npm test

Launches the test runner.

## Motivation

This app was created to allow users to track their own unique inventory quickly and simply.

## Challenges

The primary challenge was ensuring endpoints were protected through effective implementation of middleware, authentication, and authorization. This would allow proper security support to the client-end. Thus, for the fetch calls coming from the client end, JSON Web Tokens and bearer tokens were utilized in the middleware. Encrypting and hiding user information in the payload not only made the application more secure, but the JWT payload also aided in accessing specific user information, which was needed for many of the routes and in all of the components on the client end. For additional security measures, bcrypt was used to encrypt user passwords.

## Technologies Used

React, Node.js, Express, JavaScript and PostgreSQL.
