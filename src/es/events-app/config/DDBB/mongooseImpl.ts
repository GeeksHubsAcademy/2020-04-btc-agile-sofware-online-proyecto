import { MongooseCon } from "./MongooseCon";

/***********************
User Database Connection
************************/

const urlDatabase = 'mongodb://localhost:27017/eventsapp';
const Message = 'Connected to Database';
const DatabaseConnection = new MongooseCon(urlDatabase,Message).MongoProcess();

export = urlDatabase;
 


