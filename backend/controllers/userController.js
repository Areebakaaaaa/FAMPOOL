//Contains all user related functions
// addUser, updateUser, deleteUser, displayUser 
const { AdminFirestore } = require('../utils/db');

  async function addUser(userDetails) {
    const usersCollection = AdminFirestore.collection('users');
    
    const dateTime = new Date();
    //console.log(dateTime);
    const date = dateTime.toLocaleDateString('en-US',{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    const time = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    try {
      const userDoc = await usersCollection.add({
        fname: userDetails.fname,
        lname: userDetails.lname,
        nuId: userDetails.nuId,

        userType: userDetails.userType,
        nuEmail: userDetails.nuEmail,
        phone: userDetails.phone,
        password: userDetails.password,
        gender: userDetails.gender,

        date: date,
        time: time,

      });
  
      console.log('User added successfully with ID:', userDoc.id);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }
  
  async function verifyUser(loginDetails){
  
  const usersCollection = AdminFirestore.collection('users');
  const nuEmail= loginDetails.nuEmail;
  const password= loginDetails.password;

  console.log("NuEmail: ", nuEmail);

  try{
    const snapshot = await usersCollection.where('nuEmail','==', nuEmail).where('password','==',password).get();
    if(snapshot.empty){
      console.log('No matching documents.');
      return false;
    }
    else{
      console.log('Match Found.');
      return true;
    }

  }catch(err){
    console.log(err);
  }
}

  module.exports = ({addUser, verifyUser});

  