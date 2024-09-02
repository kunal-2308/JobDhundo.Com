let express = require('express');
const { registerCompany, getCompany, getCompanybyName, updateCompany, deleteCompany } = require('../controllers/comanyController');
let companyRouter = new express.Router();
let auth = require('../middleware/auth');

companyRouter.route('/register').post(auth,registerCompany);
companyRouter.route('/getcompany/list').get(auth,getCompany);
companyRouter.route('/getcompany/:name').get(auth,getCompanybyName);
companyRouter.route('/update/:company').post(auth,updateCompany);
companyRouter.route('/delete/:company').get(auth,deleteCompany);

module.exports = companyRouter;