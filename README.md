# scrape-recipes
An express server that scrapes various sites for recipes

## Abstract
This is a node / express server that uses the node-fetch package to send GET requests to various websites. After getting a
successful request we use cheerio.js to interact with the DOM and find our recipes / ingredients.

It is built with TypeScript and can be ran with the `npm run dev` command

For tests we use jest as well as ts-jest to work nicely with typescript. For easier HTTP testing supertest is also leveraged.

## Architecture
We have 2 main files that run our app, `app.ts` and `controllers.ts`.

`app.ts` is the entry point to our application. It is responsible for serving the express application and handling the
routing between different route handler functions.

`controllers.ts` handles the GET requests to the outside resources as well as the parsing of the cheerio 'virtual' DOM and 
creates the response object.

## Reflections
Though the app now is only 2 files, it can certainly be broken up into smaller modules. Right now `controllers.js` handles too 
much logic and should be separated into an API layer and DOM processor layer. The API layer would be responsible for handling 
the HTTP request and any failures that may occur. The DOM processor layer would be responsible for handling the complex DOM 
parsing logic.

Right now each controller handles the processing of the HTML separately, but there can certainly be improvements to make the 
parsing more generic, even though it is at the mercy of the HTML.

Currently the app uses Promises with `.then()` and `.catch()` but these could be easily swapped out for async / await.

Other frameworks that looked useful were Puppeteer but I am happy with the choice of Cheerio as Puppeteer looked to be much 
heavier and have features that were not relevant to this use case.

There could certainly be more in depth test coverage and looking back Jest perhaps was not the right choice. Mocha looks to be 
more natural framework for testing Express applications.

"Your code should be prepared for website DOM changes" -> this was by far the hardest challenge and indeed the code in it's current 
state is brittle and does not handle changes elegantly (besides a `catch.()`). It seems to me that we will always be at the 
mercy of the source's HTML, thus having no control. The only way I could envision this being easier would be to train a machine 
learning model (using TensorFlow or ML5) on each of the DOM's and have that model search / parse the DOM for the information 
we need. This is more resilient but still not a 100% solution - would love to discuss!

