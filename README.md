# Fastpoll
Fastpoll is a simple polling app built using Meteor and React. It was created to be extremely simple, not bulletproof.

## Components
- Node modules
  - `react` - React.js
  - `react-dom` - React virtual DOM
  - `react-keyframes` - Easy animations with React components
  - `react-mounter` - React component mounter which allows components to react to real time Meteor data
- `/client` - Client side templates, **Meteor** JavaScript files, and static files
  - `/stylesheets` - Client stylesheets
    - `main.css` - Main (and only) site stylesheet
  - `main.html` -  HTML head references to **jQuery**, **FontAwesome**, and **Materialize**
  - `routes.js` - **FlowRouter** routing table
- `/imports` - All imported files
  - `/api` - **Mongo** collections and associated Meteor methods
    - `options.js` - Poll options collection
    - `polls.js` - Polls collection
  - `ui` - **React** components
    - `About.jsx` - About page
    - `CreatePoll.jsx` - Poll creation page
    - `Error.jsx` - Errors to be shown to the user
    - `Layout.jsx` - Container for page-specific components
    - `Navbar.jsx` - Site navbar
    - `Option.jsx` - Individual poll option
    - `ShowPoll.jsx` - Individual poll view
- `/server` - Server side JavaScript files
  - `server.js` - Import relevant collections

## Test Environment
- CentOS 7
- Docker 1.9.1
- Meteor 1.3.3

## Setup
1. Clone this repository: `git clone https://github.com/jswny/Fastpoll.git`
2. Start a MongoDB database from the official Docker image: `docker run --name fastpoll-db -d mongo`
3. In the `fastpoll` directory, build the Fastpoll Docker image: `docker build -t jswny/fastpoll .`
4. Start Fastpoll by running the newly created image and linking it to the MongoDB database: `docker run -d --name fastpoll --link fastpoll-db:mongo -e ROOT_URL=http://localhost/ -e MONGO_URL=mongodb://fastpoll-db:27017 -p 80:80 jswny/fastpoll`
5. Your new Fastpoll server will be running on port `80`!
