# neurosity-web-app

Web app that connects to a neurosity device to display the wearer's calm and focus levels based on their brainwaves.  
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

Use to the input fields to simulate a change in the calm and focus levels. This should trigger the web app to send over the new values to the database. you'll be able to see this within the server side terminal as well as on MongoDB, this is a good time to see if its writing to the correct database.

If everything is working then you can go ahead and comment out the input fields within the the Calm page  
(Found at: nuerosity-web-app/client/src/pages/Calm.js)  
The specific code block will look like this.
        
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

