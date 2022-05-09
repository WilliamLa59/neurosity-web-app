# neurosity-web-app

Web app that connects to a neurosity device to display the wearer's calm and focus levels based on their brainwaves.  
Logs brainwaves, calm, and focus values to a MongoDB Atlas database

Built using the following **[Starter Code](https://github.com/neurosity/notion-react-starter)**.

**Input fields are used for testing purposes and will be removed in the future.**

## How to use
### Before you start
This project assumes the MongoDB connection string is stored within a .env file under the variable name "CONNECTION_STRING".  
You must create a new file called ".env" within the root directory and copy the following line and replace the "CONNECTION STRING HERE" string with your actual connection string, with the user password, without quotes.

First, start the server/backend by running "npm start" within the root directory.

Then in another terminal, cd into the client folder and run the react app using "npm start"
