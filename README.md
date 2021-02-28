# Auth App
Auth App is a project I made to teach myself basic principles of user authentication and authorization with [jsonwebtokens](https://jwt.io/).

However, instead of just coding up a simple auth server and API, I wanted to make a full stack app, to integrate auth on frontend too. I went with [Nuxt.js](https://nuxtjs.org/), so that I could easily render the content on the server.

The app is fully open-source, so feel free to build it yourself and play around with it, or include it's code in your project. 😊
## How to build the app

First clone this repo and install dependencies:
```bash
npm i
```
Then rename ```.env.example``` to ```.env``` so that you can connect to the database:
```bash
mv .env.example .env
```
Now you can start the dev server using:
```bash
# runs on port 3000
npm run dev
```
And the auth server with:
```bash
# runs on port 4000
npm run auth
```

## Bugs, issues or questions?
If you find any bugs, or have any questions regarding the project, please [contact me](https://filiptoma.com).
