// DEBUG=app:* node utils/scripts/seedUsers.js

const bcrypt = require('bcrypt');
const debug = require('debug')('app:scripts:users');
const MongoDB = require('../../libs/mongodb');
const config  = require('../../config');

const users = [
  {
    email: config.defaultUserEmail,
    name: 'USER',
    password: config.defaultUserPassword,
  }
];

async function createUser(mongoDB, user) {
  const { name, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword
  });

  return userId;
}

async function seedUsers() {
  try {
    const DB = new MongoDB();

    const promises = users.map(async user => {
      const userId = await createUser(DB, user);
      debug('User created with id:', userId);
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
}

seedUsers();