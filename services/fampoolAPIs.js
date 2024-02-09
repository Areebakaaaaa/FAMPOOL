import axios from 'axios'

export const addUser = async (name) => {
    try{
        console.log("Before API");
        //console.log("Name: ", userDetails.name, "Rollno: ", userDetails.nuId);
        const res = await axios.post('http://192.168.100.14:5000/users/add-user', userDetails)
        console.log("After API");

    }catch(err){
        console.log(err)
    }
}

export const getUser = async (loginDetails) => {
    try{
        console.log("Login process API entered.");
        console.log("NuID: ", loginDetails.nuEmail);
        console.log("Password: ", loginDetails.password);
        const res = await axios.post('http://192.168.100.14:5000/users/get-user', loginDetails);
        console.log("Login API exit.");
        return res.data;

    }catch(err)
    {
        console.log(err);
    }
}



