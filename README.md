# Chat Bot

Implement a chat bot as a web application using the flow.json file as input data. You can put more or less effort into certain features to show your interests and strengths.

## Features

-[ ] Load the data (asynchronously or via SSR)
-[ ] The chat bot flow start with question id 100
-[ ] Use the chosen option‘s nextId to guide the user through the dynamic flow
-[ ] If the nextId is false, the flow is terminated and the following message is shown: „Herzlichen Dank für Ihre Angaben“
-[ ] The answers are sent as a PUT request to [https://virtserver.swaggerhub.com/L8475/task/1.0.0/conversation](this endpoint). ([https://app.swaggerhub.com/apis-docs/L8475/task/1.0.0](OpenAPI specification))

## Tools & Technology Stack

* Visual Studio Code
*	Git
*	Typescript 3+ (Strict Mode)
*	React 17+
*	Material UI and JSS

## Target

ECMAScript 2015

## Browser compatibility

*	Internet Explorer Edge 15+
*	Firefox 54+
*	Chrome 51+
*	Safari 10+

## Delivery

*	Git repository + yarn start to run a dev build
*	Git repository + VS Code Dev Container
*	Docker via Docker Hub
