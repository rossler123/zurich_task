# Chat Bot

Implement a chat bot as a web application using the [flow.json](flow.json) file as input data. You can put more or less effort into certain features to show your interests and strengths.

## Features

- [x] Load the [chat bot data](flow.json) asynchronously or via SSR
- [x] The chat bot flow starts with question id 100
- [x] Use the chosen option‘s nextId to guide the user through the dynamic flow
- [x] If the nextId is false, the flow is terminated and the following message is shown: „Herzlichen Dank für Ihre Angaben“
- [x] The answers are sent as a PUT request to [this endpoint](https://virtserver.swaggerhub.com/L8475/task/1.0.0/conversation) (see [OpenAPI specification](https://app.swaggerhub.com/apis-docs/L8475/task/1.0.0) for details)

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

Good luck and have fun!
