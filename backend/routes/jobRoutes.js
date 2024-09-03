let express = require('express');
const { postJob,  getallAdminPost, getAllStudentPost} = require('../controllers/jobController');
let jobRouter = new express.Router();
let auth = require('../middleware/auth')

jobRouter.route('/post').post(auth,postJob);
jobRouter.route('/admin/joblist').get(auth,getallAdminPost);
jobRouter.route('/user/joblist').get(auth,getAllStudentPost);
module.exports = jobRouter;