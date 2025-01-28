import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getRefreshAccessToken } from "../Services/LoginApiService";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ userDetails: {}, isLoggedIn: false });
  //user = {{userDetails},isLoggedIn}
  //userDetails = {
  //   "id": 1,
  //   "username": "emilys",
  //   "email": "emily.johnson@x.dummyjson.com",
  //   "firstName": "Emily",
  //   "lastName": "Johnson",
  //   "gender": "female",
  //   "image": "https://dummyjson.com/icon/emilys/128",
  //   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT accessToken (for backward compatibility) in response and cookies
  //   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // refreshToken in response and cookies
  // }

  const navigator = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.log("Invalid token", error);
      return true;
    }
  };

  const refreshAccessToken = async () => {
    const { refreshToken } = user.userDetails;

    if (!refreshToken) {
      console.log("RefreshToken is not valid");
      return;
    }

    try {
      const result = await getRefreshAccessToken(refreshToken);

      console.log("Response of Refresh Access Token", result);
      if (result.status === 200) {
        const data = await result.data;
        const { accessToken, refreshToken: newRefreshToken } = data;

        setUser((prevUser) => ({
          ...prevUser,
          userDetails: {
            ...prevUser.userDetails,
            accessToken,
            refreshToken: newRefreshToken,
          },
        }));

        console.log("Access token refreshed successfully");
      } else if (result.status === 401) {
        logOut(); //User needs to Re-Login as RefreshToken is Invalid.
      } else {
        console.log("AccessToken is not refreshed", result.status);
        //Need to check whether to logout or not.
      }
    } catch (error) {
      console.error(error);
      logOut();
    }
  };

  const logOut = () => {
    setUser({ userDetails: {}, isLoggedIn: false });
    navigator("/");
  };

  useEffect(() => {
    let intervalId;
    if (user.isLoggedIn) {
      intervalId = setInterval(() => {
        const { accessToken } = user.userDetails;
        if (isTokenExpired(accessToken)) {
          refreshAccessToken();
        }
      }, 60 * 60 * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user.userDetails, user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
