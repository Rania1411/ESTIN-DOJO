require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('./src/models/User');
const Module = require('./src/models/Module');
const PomodoroSession = require('./src/models/PomodoroSession');
const Message = require('./src/models/Message');

const connectDB = require('./src/config/db');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to DB. Starting initialization...');

    // 1. Create a dummy user (Admin)
    // We use User.create which will trigger the pre-save hook to hash the password
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin2@estin.dz',
      password: 'adminpassword123',
      role: 'admin',
      year: 'Other'
    });
    console.log('Collection "users" created.');

    // 2. Create a dummy module
    const dummyModule = await Module.create({
      name: 'Algorithmics & Data Structures',
      year: '1CP',
      description: 'Introduction to algorithms and data structures.',
      createdBy: adminUser._id
    });
    console.log('Collection "modules" created.');

    // 3. Create a dummy pomodoro session
    await PomodoroSession.create({
      user: adminUser._id,
      duration: 25,
      startTime: Date.now(),
      status: 'completed',
      endTime: Date.now() + 25 * 60000
    });
    console.log('Collection "pomodorosessions" created.');

    // 4. Create a dummy message
    await Message.create({
      sender: adminUser._id,
      content: 'Welcome to the Estin Dojo global chat!'
    });
    console.log('Collection "messages" created.');

    console.log(' All collections successfully created in MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log(' Collections already exist (Dummy data was already inserted).');
      process.exit(0);
    }
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
