import axios from 'axios';

export const addUser = async (name) => {
    try{
        console.log("Name passed: ",name);
        console.log("Before API");
        const res = await axios.post('http://192.168.156.69:5000/users/add-user', {
            name: name
        })
        console.log("After API");

    }catch(err){
        console.log(JSON.stringify(err,null,2));
    }
}

