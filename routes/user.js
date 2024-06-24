const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.post('/register',userController.createuser);
router.post('/login',userController.loginUser);
router.get('/all-users',userController.getallUsers);
router.get('/:id',userController.getaUser);
router.delete('/:id',userController.deleteaUser);
router.post('/:id',userController.updateaUser);
// router.get('/sign-out',userController.destroySession);

module.exports = router;