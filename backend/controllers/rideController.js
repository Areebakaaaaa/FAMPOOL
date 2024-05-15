const { AdminFirestore } = require('../utils/db');


async function addRide(postRideDetailsTwo){
    const usersCollection = AdminFirestore.collection('availableRides');

    try{
      const waypoints = postRideDetailsTwo.waypoints || [];

      const userDoc = await usersCollection.add({
        driverId: postRideDetailsTwo.driverId,
        customerType: postRideDetailsTwo.customerType,
        hours: postRideDetailsTwo.hours, 
        minutes: postRideDetailsTwo.minutes,
        amPm:  postRideDetailsTwo.amPm,
        date: postRideDetailsTwo.date, 
        seats: postRideDetailsTwo.seats,

        origin: postRideDetailsTwo.origin,
        destination: postRideDetailsTwo.destination,
        distance: postRideDetailsTwo.distance,
        duration: postRideDetailsTwo.duration,
        bookedSeats: postRideDetailsTwo.bookedSeats,
        waypoints: postRideDetailsTwo.waypoints,

      })

      console.log("Ride posted successfully with ID: ", userDoc.id);
    }catch(err)
    {
      console.error("Error posting ride: ", err);
    }

  }

  async function bookRide(bookRideDetails){
    const usersCollection = AdminFirestore.collection('bookedRides');

    try{
      const userDoc = await usersCollection.add({
        userId: bookRideDetails.userId,
        driverId: bookRideDetails.driverId, 
        fare: bookRideDetails.aaa, 
        pickUp: bookRideDetails.pickUp, 
        dropOff: bookRideDetails.dropOff, 
        rideStatus: bookRideDetails.rideStatus,
      })

      console.log("Ride booked successfully with Ride-ID: ",userDoc.id);
    }catch(err){
      console.error("Error booking ride: ",err);
    }

  }
  
  const getAvailableRide = async (req, res) =>{
    try{
      const availableRideCollection= AdminFirestore.collection('availableRides');
      const snapshot = await availableRideCollection.get();
      const rides=[];
      snapshot.forEach(doc => {
        rides.push({id: doc.id, ... doc.data()});
      });

      console.log("Available Rides: ", rides);
      res.status(200).send(rides);
    } catch(err){
      console.error('Error fetching available rides: ', err);
      res.status(500).send('Error fetching available rides');
    };
  }

  const getBookedRide = async (req,res) =>{
    try{
      const bookedRideCollection=AdminFirestore.collection('bookedRides');
      const snapshot= await bookedRideCollection.get();
      const rides=[];
      snapshot.forEach(doc=>{
        rides.push({id:doc.id,...doc.data()});
      });

      console.log("Booked Rides: ",rides);
      res.status(200).send(rides);
    }catch(err){
      console.error('Error fetching booked rides: ', err);
      res.status(500).send('Error fetching booked rides');
    }
  }



  const getDemoLocation = async (req, res) =>{
    try{
      const demoLocationCollection= AdminFirestore.collection('demoLocation');
      const snapshot = await demoLocationCollection.get();
      const loc=[];
      snapshot.forEach(doc => {
        loc.push({id: doc.id, ... doc.data()});
      });

      console.log("Available Rides: ", loc);
      res.status(200).send(loc);
    } catch(err){
      console.error('Error fetching available rides: ', err);
      res.status(500).send('Error fetching available rides');
    };
  }
  
  module.exports = ({addRide, bookRide, getAvailableRide, getBookedRide, getDemoLocation});