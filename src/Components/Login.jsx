import React, { useEffect, useRef, useState } from "react";
import { checkUserCred } from "../Services/LoginApiService";
import { useNavigate,NavLink } from "react-router-dom";
import styles from "../Styles/Login.module.css";
import styles1 from "../Styles/Navbar.module.css";
import { UserContext } from "../Context/UserContextProvider";
import { useContext } from "react";

const Login = () => {
  const usernameRef = useRef("");
  const pswdRef = useRef("");
  const navigator = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [checking, setChecking] = useState(false);
  const {user, setUser} = useContext(UserContext);

  const callLoginAPI = async (usernameVal, passwordVal) => {
    try {
      setChecking(true);
      const result = await checkUserCred(usernameVal, passwordVal);
      console.log(result);
      if (result.status === 200) {
        setSuccess(true);
        setUser({ userDetails: result.data, isLoggedIn: true });
        console.log(result.data);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    let intervalId;
    if (success) {
      intervalId = setInterval(() => {
        navigator("/my-basic-ecommerce-site/");
      }, 4000);
    }

    return () => clearInterval(intervalId);
  }, [success]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = usernameRef.current.value;
    const pwd = pswdRef.current.value;
    if (user && pwd) {
      callLoginAPI(user, pwd);
    } else {
      setErrorMsg("Either username or Password is not valid");
    }
  };

  return (
    <div className={styles.center}>
      {checking ? (
        <div>
          <h1>
            Authenticating entered details. <br />
            Kindly wait....
          </h1>
        </div>
      ) : (
        <>
          {success ? (
            <div>
              <h1>Welcome {user.username}</h1>
              <h3 style={{ color: "green" }}>Login Successful.</h3>
            </div>
          ) : (
            <div className={`${styles.divSpace} ${styles.formBg}`}>
              <div className={styles.divSpace}>
                <h1>Login form</h1>
                <p>Login to get access to site:</p>
              </div>
              <form className={`${styles.divSpace}`} onSubmit={handleLogin}>
                <div className={styles.inputBlock}>
                  <label htmlFor="username">UserName:</label>
                  <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    placeholder="Vishnu Kishore"
                  />
                </div>
                <div className={styles.inputBlock}>
                  <label htmlFor="pswd">Password:</label>
                  <input
                    type="password"
                    id="pswd"
                    ref={pswdRef}
                    placeholder="********"
                  />
                </div>
                <div className={styles.inputBlock}>
                  <input type="submit" value="Login" />
                </div>
                <div>
                <p>Don't have an account? <NavLink
                to="/my-basic-ecommerce-site/auth/signUp"
                className={({ isActive }) =>
                  isActive ? styles1.activeLink : styles1.navLink
                }
              >
                Create an account
              </NavLink></p>
              </div>
              </form>
              
              {errorMsg ? (
                <p style={{ color: "orange", textAlign:'left', paddingLeft:'20px', fontSize:'14px' }}>
                  {errorMsg}<br/> Try to login again.
                </p>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
