
import axios from 'axios';

export const checkUserCred = async(username, password) => {

    //axios.post(url,data,config)
    //data - {}
    //config - {content-Type,withCredentials}

    try 
    {
        const response = await axios.post('https://dummyjson.com/auth/login',
        {
            username: username,
            password: password,
            //expiresInMins: 60, //optional if given it takes time or default is 60
        },
        {
            headers: {
                'Content-Type': 'application/json', // Request headers
            }
        });
        return response;
    }
    catch (error) {
        throw error; // Handle error
    };
}

export const getRefreshAccessToken = async (refreshToken) => {
    try {
        const response = axios.post('https://dummyjson.com/auth/refresh',
            {
                refreshToken:refreshToken,
                //expiresInMins: 30, //optionsl
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials : true
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}