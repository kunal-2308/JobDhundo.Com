let express = require('express');
const { applyJob, getAllAppliedJobs, viewApplicants, updateStatus } = require('../controllers/applicationController');
let applicationRouter = new express.Router();
let auth = require('../middleware/auth');


applicationRouter.route('/apply/:jobid').post(auth,applyJob);
applicationRouter.route('/applied').get(auth,getAllAppliedJobs)
applicationRouter.route('/view/applicants/:jobid').get(auth,viewApplicants);
applicationRouter.route('/admin/status/:id').patch(auth,updateStatus);
module.exports = applicationRouter;