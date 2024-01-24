import axios from 'axios'

export const addUser = async (name) => {
    try{
        const res = await axios.post('http://localhost:5000/users/add-user', {
            name: name
        })
        console.log(res)

    }catch(err){
        console.log(err)
    }
}

