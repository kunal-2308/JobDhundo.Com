const express = require('express');
const { register, login, updateUser, logout, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile/update').patch(auth,updateUser);
router.route('/logout').get(auth,logout);
router.route('/delete/account').delete(auth,deleteUser);
module.exports = router;
