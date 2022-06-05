# neurosity-web-app

Web app that connects to a Neurosity Crown device to display the workers's calm and focus readings based on their brainwaves to determine their level of drowsiness as a result of narcotis.

Logs brainwaves, calm, and focus values to a MongoDB Atlas database

Built off of the following **[Starter Code](https://github.com/neurosity/notion-react-starter)**.  

## Getting Started
#### [Setup Instructions(For beginners)](https://docs.google.com/document/d/1gbDbX2cOK-kb6So1c6QXg4xP2p8YOMj1PqDFcEyIzyg/edit?usp=sharing)


### Before you start   
This project assumes the MongoDB connection string is stored within a .env file under the variable name "CONNECTION_STRING".  
You must create a new file called ".env" within the root directory  

Copy the following line and replace "CONNECTION STRING HERE" with your actual connection string, there should be no quotations.
*make sure you put your password and specifc database name within your connection string* 

        CONNECTION_STRING = "CONNECTION STRING HERE"
        
### How to start
1) Start the server/backend by running "npm start" within the root directory.

2) In another terminal, cd into the client folder and run the react app using "npm start"

### Test to see if your database is connected properly ( needs to be updated )
If the connection string is correct you should be able to see "MongoDB connected successfully..." within the server side terminal when the server is started. If not you may have to go back and double check your .env file and connection string.


## ToDo List (in no particular order)
- add timestamps for session end
- explain functionality and processes in documentation 
- search feature for table to display previous sessions
- graph brainwaves (maybe calm and focus levels too?)
- add styling
- ~~categorize database into "sessions" being a collection of entry logs~~
- ~~add timestamps for each entries~~ 
- ~~add naming functionality for each session~~
- ~~add comments to code~~
- ~~empty object on data log~~
- ~~refactor variable naming convention~~
- ~~add a table that updates in real time that follows along the main state object~~
- ~~streamline data logging procedure~~
- ~~start and stop button for reading from the crown~~
- ~~transfer JSON data into excel/csv format and allow for download~~
- ~~have "csvData" be created only when the "Download" button is pressed~~

## Bug List
- ~~entryid doesn't increment when used with the device.~~

## Changelog (mm/dd/yy)
### 05/09/22
- initial commit
### 05/12/22
- edited database and website to categorize entry logs into "sessions" instead of indivdual logs within a database.
### 05/16/22
- added the ability to attach a first and last name to a current session 
- each log entry now has a timestamp of when it was taken (format: hh:mm:ss)
### 05/17/22
- removed empty starting entry
- added seconds to the session start timestamp
- refreshes webpage on log to empty state object
- fixed brainwave property displaying "[object Object]" (needs to be tested)
### 05/20/22
- added a start/stop button for device reading
- added a table for the mindlogs that updates in realtime, data persists on log but clears when a new session begins
- no longer need to refresh on log, it will automatically clear main state object
### 05/22/22
- updated table to display all brainwaves readings
- added a download function for the table to download to CSV format
### 05/23/22
- added some styling for main dashboard(still WIP)
### 05/25/22
- changed test method to automatically randomize calm and focus values every 1 second instead of manually inputting them
- fixed issue with logging useEffect dependency array, logs 1 entry every time the calm value changes which is every 1 second
### 05/30/22
-fixed entryId not being saved in data base
### 06/01/22
- altered simulated test method to randomize calm and focus values every 62.5 ms to simulate grabbing every brainwave reading from the crown.
### 06/03/22
- altered logging timing to match simulated test method
### -6/05/22
- created Setup Instruction Document
- revised main Readme.md
