const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  perDaySalary: { type: Number, required: true },
  workingDays: { type: Number, required: true },
  totalSalary: { type: Number, required: true },
});

module.exports = mongoose.model('salaries', salarySchema);
