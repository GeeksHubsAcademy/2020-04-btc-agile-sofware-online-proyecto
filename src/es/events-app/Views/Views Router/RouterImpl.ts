import  { app } from '../../app';
import { Router } from './Router'
import UserRouter = require('../UserViews');
import EventRouter = require('../EventViews')
import InvitedRouter = require('../InvitedViews');


/***************
Router for Users
****************/
const RouterUser = new Router(app,UserRouter,'/').router();

/***************
Router for Event
****************/
const RouterEvent = new Router(app,EventRouter,'/').router();

/***************
Router for Invited
****************/
const RouterInvited = new Router(app,InvitedRouter,'/').router();