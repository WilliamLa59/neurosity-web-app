# neurosity-web-app

Web app that connects to a Neurosity Crown device to display the workers's calm and focus readings based on their brainwaves to determine their level of drowsiness as a result of narcotis.

Logs brainwaves, calm, and focus values to a MongoDB Atlas database

Built off of the following **[Starter Code](https://github.com/neurosity/notion-react-starter)**.  

## Getting Started
### Before you start   
This project assumes the MongoDB connection string is stored within a .env file under the variable name "CONNECTION_STRING".  
You must create a new file called ".env" within the root directory  

Copy the following line and replace "CONNECTION STRING HERE" with your actual connection string, there should be no quotations.
*make sure you put your password and specifc database name within your connection string* 

        CONNECTION_STRING = "CONNECTION STRING HERE"
        
### How to start
1) Start the server/backend by running "npm start" within the root directory.

2) In another terminal, cd into the client folder and run the react app using "npm start"

### Test to see if your database is connected properly
If the connection string is correct you should be able to see "MongoDB connected successfully..." within the server side terminal when the server is started. If not you may have to go back and double check your .env file and connection string.

Use the input fields to simulate a change in the calm and focus levels. This should trigger the web app to send over the new values to the database. You'll be able to see this within the server side terminal as well as on MongoDB, this is also a good time to see if its writing to the correct database.

If everything is working then you can go ahead and comment out the input fields within the the Calm page, and test with an actual device.

The specific code block is at the very bottom and will look like this. It can be found at:  
nuerosity-web-app/client/src/pages/Calm.js
        
        {/*For Database testing */}
        <div>
        <form onSubmit={handleSubmit}>
          <div className="form-input" >
            <input type='Text' name="newcalm" value={inputs.newcalm || ""} onChange={handleChange}/>
          </div>
          <div className="form-input">
            <input type='Text' name="newfocus" value={inputs.newfocus || ""} onChange={handleChange}/>
          </div>
          <button>submit</button>
        </form>
        </div> 

## Changelog
- edited database and website to log entries as part of sessions instead of indivdually.

- streamline data logging procedures
- empty object on data log
- need to add timestamps for each entry, and session end time stamp
