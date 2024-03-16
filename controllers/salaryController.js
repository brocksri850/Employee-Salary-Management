const Salary = require('../models/Salary');
const Employee = require('../models/Employee');

// Add salary details for an employee
exports.addSalary = async (req, res) => {
  try {
    const { employeeId, perDaySalary, workingDays } = req.body;

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Calculate total salary
    const totalSalary = perDaySalary * workingDays;

    // Create salary details
    const salary = await Salary.create({ employee: employeeId, perDaySalary, workingDays, totalSalary });

    res.status(201).json({ message: 'Salary details added successfully', salary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all salary details
exports.getAllSalaryDetails = async (req, res) => {
  try {
    const allSalaries = await Salary.find();
    if (!allSalaries || allSalaries.length === 0) {
      return res.status(404).json({ message: 'No salary details found' });
    }
    res.status(200).json(allSalaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get salary details by employee ID
exports.getSalaryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await Salary.findOne({ employee: id });
    if (!salary) {
      return res.status(404).json({ message: 'Salary details not found for this employee' });
    }
    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update salary details
exports.updateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { perDaySalary, workingDays } = req.body;

    // Calculate total salary
    const totalSalary = perDaySalary * workingDays;

    const updatedSalary = await Salary.findByIdAndUpdate(id, { perDaySalary, workingDays, totalSalary }, { new: true });
    if (!updatedSalary) {
      return res.status(404).json({ message: 'Salary details not found' });
    }
    res.status(200).json({ message: 'Salary details updated successfully', salary: updatedSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete salary details
exports.deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSalary = await Salary.findByIdAndDelete(id);
    if (!deletedSalary) {
      return res.status(404).json({ message: 'Salary details not found' });
    }
    res.status(200).json({ message: 'Salary details deleted successfully', salary: deletedSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
