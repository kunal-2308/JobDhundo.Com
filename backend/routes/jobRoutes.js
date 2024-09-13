let express = require('express');
const { postJob,  getallAdminPost, getAllStudentPost, updateJob, getAllJobPost} = require('../controllers/jobController');
let jobRouter = new express.Router();
let auth = require('../middleware/auth')

jobRouter.route('/post').post(auth,postJob);
jobRouter.route('/admin/joblist').get(auth,getallAdminPost);
jobRouter.route('/user/joblist').get(auth,getAllStudentPost);
jobRouter.route('/admin/update/:jobid').patch(auth,updateJob);
jobRouter.route('/find').get(getAllJobPost);
module.exports = jobRouter;