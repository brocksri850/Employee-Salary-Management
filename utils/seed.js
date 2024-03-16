// seed.js
const User = require('../models/User');

const seedAdminUser = async () => {
  // Check if admin user already exists
  const adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    // Create admin user
    await User.create({
      username: 'admin',
      password: 'adminpassword' // Change this to a secure password
    });
    console.log('Admin user seeded successfully');
  } else {
    console.log('Admin user already exists');
  }
};

seedAdminUser();
