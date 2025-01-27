
import axios from 'axios';

export const checkUserCred = async() => {

    //axios.post(url,data,config)
    //data - {}
    //config - {content-Type,withCredentials}

    try 
    {
        const response = await axios.post('https://dummyjson.com/auth/login',
        {
            username: 'emilys',
            password: 'emilyspass',
            expiresInMins: 30,
        },
        {
            headers: {
                'Content-Type': 'application/json', // Request headers
            }
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error; // Handle error
    };
}