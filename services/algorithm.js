import { mileage, petrolPrice } from "./config";

export const calculateFareShares = (bookRideDetails, dis) => {
  const seats = bookRideDetails.bookedSeats;
  const totalDistance = bookRideDetails.totalDistance;
  const numPassengers = bookRideDetails.bookedSeats;
 

  // Example usage:
//const numPassengers = 2; // Example value
//const totalDistance = 18; // Example value
const distances = [10, 18, 16]; // Example distances

const TotalPriceformula = (totalDistance*petrolPrice)/mileage;
const TotalFare=TotalPriceformula+100;

let totalPassengerDistance = 0;

  //let totalPassengerDistance = distances.reduce((acc, distance) => acc + distance, 0);
  for(let i=0; i<seats; ++i)
  {
    totalPassengerDistance+= distances[i];
  }
  totalPassengerDistance=totalPassengerDistance+ dis;
  console.log("Total Passenger Distance: ",totalPassengerDistance);

  let passengers = [];
  let i;
  for (i = 0; i < seats; ++i) {
    console.log(distances[i]);
      let passenger = {
          name: `Passenger ${i + 1}`,
          distance: distances[i],
          fareShare: (distances[i] / totalPassengerDistance) * TotalFare
      };
      passengers.push(passenger);
  }

  console.log("Value of i: ", i);
  let extra = {
    name: `Passenger ${i + 1}`,
    fareShare: (dis / totalPassengerDistance) * TotalFare
};
passengers.push(extra);

  //fareShares.forEach(passenger => {console.log(`${passenger.name}: ${passenger.fareShare}`);
  passengers.forEach(passenger => {
    console.log(`${passenger.name}: ${passenger.fareShare}`);
  });

  return passengers;
}



