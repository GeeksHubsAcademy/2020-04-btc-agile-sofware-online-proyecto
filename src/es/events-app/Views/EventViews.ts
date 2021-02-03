import express = require('express');
const router =  express.Router();
import EventControllers = require('../Implements/EventImplement')

/**************************
Create event
**************************/
router.post('/event/register',EventControllers.Create);

/**************************
Get events token
**************************/
router.get('/events',EventControllers.GetAll)

/**************************
Get one event token
**************************/
router.get('/event',EventControllers.Get)

/**************************
Get event public
**************************/
router.get('/event/public',EventControllers.GetPublic)

/**************************
Update event
 **************************/
router.put('/event/update',EventControllers.Update);

/**************************
Delete event
 **************************/
router.delete('/event/delete',EventControllers.Delete);



export = router;
