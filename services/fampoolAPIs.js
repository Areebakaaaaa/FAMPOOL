import axios from 'axios';
const ipv4='http://192.168.100.14'

export const addUser = async (userDetails) => {
    try{
        console.log("Before API");
        //console.log("Name: ", userDetails.name, "Rollno: ", userDetails.nuId);

        const res = await axios.post(`${ipv4}:5000/users/add-user`, userDetails)

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

        const res = await axios.post(`${ipv4}:5000/users/get-user`, loginDetails);

        console.log("Login API exit.");
        return res.data;

    }catch(err)
    {
        console.log(err);
    }
}

export const postingRide= async (postRideDetails) => {
    try{
        console.log("Posting ride API entered.", postRideDetails.toFromFast);
        const res = await axios.post(`${ipv4}:5000/users/post-ride`, postRideDetails);
        console.log("Post ride API exit.");
        return res.data;

    }catch(err)
    {
        console.log(err);
    }
}



