import express = require("express")
import bodyParser = require("body-parser")

/**************************
Connection for the server 
**************************/
export const app = express();

/**************************
Body Parser
**************************/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**************************
Call for the routers
**************************/
require('./Views/Views Router/RouterImpl')

