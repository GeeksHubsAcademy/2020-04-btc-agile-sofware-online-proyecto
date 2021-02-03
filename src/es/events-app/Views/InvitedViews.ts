import express = require('express');
const router =  express.Router();
import InvitedControllers = require('../Implements/InvitedImplement')

/**************************
Create user Invited
**************************/
router.post('/invited/register',InvitedControllers.Create);

/**************************
Get user Invited
**************************/
router.get('/invited/invitation',InvitedControllers.Get)

/**************************
Update user Invited
 **************************/
router.put('/invited/update',InvitedControllers.Update);

/**************************
Delete user Invited
 **************************/
router.delete('/invited/delete',InvitedControllers.Delete);

export = router;
