const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');
const JwtMiddleware = require('../utils/jwtMiddleware');

router.post('/', JwtMiddleware.checkToken, salaryController.addSalary);
router.get('/', JwtMiddleware.checkToken, salaryController.getAllSalaryDetails);
router.get('/:id', JwtMiddleware.checkToken, salaryController.getSalaryDetails);
router.put('/:id', JwtMiddleware.checkToken, salaryController.updateSalary);
router.delete('/:id', JwtMiddleware.checkToken, salaryController.deleteSalary);

module.exports = router;