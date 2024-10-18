let express = require('express');
const { postJob,  getallAdminPost, getAllStudentPost, updateJob, getAllJobPost, getJobById, getJobs} = require('../controllers/jobController');
let jobRouter = new express.Router();
let auth = require('../middleware/auth')

jobRouter.route('/post').post(auth,postJob);
jobRouter.route('/admin/joblist').get(auth,getallAdminPost);
jobRouter.route('/user/joblist').get(auth,getAllStudentPost);
jobRouter.route('/admin/update/:jobid').patch(auth,updateJob);
jobRouter.route('/find').get(getAllJobPost);
jobRouter.route('/description/:id').get(auth,getJobById);
jobRouter.route('/search').get(getJobs); // Add this line for search functionality
module.exports = jobRouter;