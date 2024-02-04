import axios from 'axios';

export const addUser = async (userDetails) => {
    try{
        console.log("Before API");
        //console.log("Name: ", userDetails.name, "Rollno: ", userDetails.nuId);
        const res = await axios.post('http://192.168.100.14:5000/users/add-user', userDetails)
        console.log("After API");

    }catch(err){
        console.log(JSON.stringify(err,null,2));
    }
}


