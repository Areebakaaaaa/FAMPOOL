import axios from 'axios';
import configData from './config';

export const addUser = async (userDetails) => {
    try{
        console.log("Before API");
        //console.log("Name: ", userDetails.name, "Rollno: ", userDetails.nuId);

        const res = await axios.post(`${configData.ipv4}:5000/users/add-user`, userDetails)

        console.log("After API");

    }catch(err){
        console.log(JSON.stringify(err,null,2));
    }
}

export const getUser = async (loginDetails) => {
    try{
        console.log("Login process API entered.");
        console.log("NuID: ", loginDetails.nuEmail);
        console.log("Password: ", loginDetails.password);

        const res = await axios.post(`${configData.ipv4}:5000/users/get-user`, loginDetails);

        console.log("Login API exit.");
        return res.data;

    }catch(err)
    {
        console.log(err);
    }
}

export const postingRide= async (postRideDetailsTwo) => {
    try{
        console.log("Posting ride API entered.", postRideDetailsTwo.waypoints);
        const res = await axios.post(`${configData.ipv4}:5000/rides/post-ride`, postRideDetailsTwo);
        console.log("Post ride API exit.");
        return res.data;

    }catch(err)
    {
        console.log(err);
    }
}

export const getAvailableRides = async() => {
    console.log("Entered available ride API.");
    const response = await axios.get(`${ipv4}:5000/rides/available-rides`);
    const data = await response.json();
    return response.data;
}

export const bookingRide= async(bookRideDetails) => {
    try{
        console.log("Book ride API entered.", bookRideDetails.aaa);
        const response = await axios.post(`${ipv4}:5000/rides/book-ride`,bookRideDetails);
        console.log("Book ride API exit.");
        return response.data;
    }catch(err){
        console.error(err);
    }
}

export const rideStatusUpdate= async (rideStatusDetails) => {
    try{
        console.log("Ya Ride ha  =>> ", rideStatusDetails.rideId);
        const res = await axios.post(`${configData.ipv4}:5000/rides/update-rideStatus`, rideStatusDetails);
        console.log("Update ride status API exit.");
        return res.data;

    }catch(err)
    {
        console.log(err);
    }
}


