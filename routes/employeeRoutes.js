const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const JwtMiddleware = require('../utils/jwtMiddleware');

router.get('/', JwtMiddleware.checkToken, employeeController.getAllEmployees);
router.post('/', JwtMiddleware.checkToken, employeeController.addEmployee);
router.get('/:id', JwtMiddleware.checkToken, employeeController.getEmployeeById);
router.put('/:id', JwtMiddleware.checkToken, employeeController.updateEmployee);
router.delete('/:id', JwtMiddleware.checkToken, employeeController.deleteEmployee);

module.exports = router;
