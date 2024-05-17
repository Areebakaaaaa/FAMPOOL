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
        fare: bookRideDetails.fare, 
        waypoint: bookRideDetails.waypoint, 
        rideStatus: bookRideDetails.rideStatus,
        rideId:bookRideDetails.rideId,
        hours: bookRideDetails.hours,
        minutes: bookRideDetails.minutes,
        amPm: bookRideDetails.amPm,
        origin: bookRideDetails.origin,
        destination: bookRideDetails.destination,
        date: "16/05/2024",
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

  const updateRideStatus = async (rideStatusDetails) => {
    try {
        const { userId, rideId, driverId, status } = rideStatusDetails;
        const bookedRideCollection = AdminFirestore.collection('bookedRides');
        const availableRidesCollection = AdminFirestore.collection('availableRides');

        // Query for booked ride
        const snapshot = await bookedRideCollection
            .where('userId', '==', userId)
            .where('driverId', '==', driverId)
            .where('rideId', '==', rideId)
            .get();

        // Query for available ride
        const snapshotTwo = await availableRidesCollection.where('rideId', '==', rideId).get();
    
        if (snapshot.empty) {
            console.log('No matching documents in bookedRides.');
            return false;
        } else {
            console.log('Match Found in bookedRides.');
            const updates = snapshot.docs.map(doc => doc.ref.update({ rideStatus: status }));
            await Promise.all(updates);

            // Update availableRides if status is 'Accepted'
            if (status === 'Accepted') {
                console.log('Updating bookedSeats in availableRides.');
                const seatUpdates = snapshotTwo.docs.map(doc => {
                    const currentSeats = doc.data().bookedSeats; // Fetch current bookedSeats value
                    console.log("currentSeats: ", currentSeats);
                    return doc.ref.update({ bookedSeats: currentSeats + 1 }); // Increment and update
                });
                await Promise.all(seatUpdates);
                console.log('bookedSeats updated successfully.');
            }

            return true;
        }
        
    } catch (err) {
        console.error('Error updating ride status:', err);
        throw err;  // Propagate the error to the caller
    }
};


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
  
  module.exports = ({addRide, bookRide, getAvailableRide, getBookedRide, updateRideStatus, getDemoLocation});