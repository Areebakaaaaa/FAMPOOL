
const { AdminFirestore } = require('../utils/db');

async function addUser(name) {
    const usersCollection = AdminFirestore.collection('users');
  
    try {
      const userDoc = await usersCollection.add({
        name
      });
  
      console.log('User added successfully with ID:', userDoc.id);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
  
  module.exports = addUser