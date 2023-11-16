import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Input } from "../UI/Input/Input";
import { Button } from "../UI/Button/Button";
import axios from "axios";

import thankyou from "../../assets/images/thankyou.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [SigninCss, setSigninCss] = useState([styles.sign_in, styles.active]);
  const [SignupCss, setSignupCss] = useState([styles.sign_up]);

  const onRegister = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setRePassword("");
    seterrorMsg("");

    setSigninCss([styles.sign_in]);
    setSignupCss([styles.sign_up, styles.active]);
  };

  const onSignin = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setRePassword("");
    seterrorMsg("");
    setSigninCss([styles.sign_in, styles.active]);
    setSignupCss([styles.sign_up]);
  };

  const [PasswordValidation, setPasswordValidation] = useState(true);


  const navigate = useNavigate();

  // sign up form values

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [RePassword, setRePassword] = useState("");

  const [ShowPassword, setShowPassword] = useState(false);

  const [ShowRePassword, setShowRePassword] = useState(false);

  useEffect(() => {
    if (RePassword !== "") {
      if (Password !== RePassword) {
        setPasswordValidation(false);
      } else {
        setPasswordValidation(true);
      }
    }
  }, [Password, RePassword]);

  const onSigninRequest = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      url: "http://localhost:3200/user/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: { password: Password, email: Email },
    };

    axios
      .request(options)
      .then(function (response) {
        localStorage.setItem('userDetails', JSON.stringify(response.data))
        navigate("/");
      })
      .catch(function (error) {
        console.error(error);
        seterrorMsg(error.response.data.message);
      });
  };
  

  const onSignupRequest = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      url: "http://localhost:3200/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: Username,
        email: Email,
        password: RePassword,
        firstName: FirstName,
        lastName: LastName,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setsignupSuccess(true);
      })
      .catch(function (error) {
        console.error(error);
        seterrorMsg(error.response.data.message);
      });
  };

  const [errorMsg, seterrorMsg] = useState("");
  const [signupSuccess, setsignupSuccess] = useState(false);
  return (
    <>
      <div className={styles.login_background}></div>
      <div className={styles.login_container}>
        <div className={styles.form}>
          <div className={styles.form_container}>
            <form onSubmit={onSigninRequest} className={SigninCss}>
              <h1>Sign In</h1>
              <Input
                label="Email"
                type="text"
                id="Email"
                // ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                required={true}
                valid={true}
              />
              <Input
                label="Password"
                type={ShowPassword ? "text" : "password"}
                id="password"
                // ref={emailRef}
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                required={true}
                showHidePasswordHandler={setShowPassword}
                showHidePassword={ShowPassword}
                ShowHide={true}
                valid={true}
              />
              {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
              <div className={styles.button}>
                <Button>Login</Button>
              </div>
              <p className={styles.register_button}>
                Don't have an account click{" "}
                <span onClick={onRegister} className={styles.here_button}>
                  here
                </span>{" "}
                to register
              </p>
            </form>
            <form onSubmit={onSignupRequest} className={SignupCss}>
              {signupSuccess && (
                <div className={styles.thankYou_Container}>
                  <img className={styles.thankyou_image} src={thankyou} />
                  <p className={styles.thankyou_text}>
                    You have successfully signed up click{" "}
                    <span onClick={onSignin}>here</span> to login
                  </p>
                </div>
              )}
              {!signupSuccess && (
                <>
                  <h1>Sign Up</h1>
                  <Input
                    label="First Name"
                    type="text"
                    id="FirstName"
                    // ref={emailRef}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={FirstName}
                    required={true}
                    valid={true}
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    id="LastName"
                    // ref={emailRef}
                    onChange={(e) => setLastName(e.target.value)}
                    value={LastName}
                    required={true}
                    valid={true}
                  />
                  <Input
                    label="Email"
                    type="text"
                    id="email"
                    // ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                    required={true}
                    valid={true}
                  />
                  <Input
                    label="Username"
                    type="text"
                    id="Username"
                    // ref={emailRef}
                    onChange={(e) => setUsername(e.target.value)}
                    value={Username}
                    required={true}
                    valid={true}
                  />
                  <Input
                    label="Password"
                    type={ShowPassword ? "text" : "password"}
                    id="passwordSignup"
                    // ref={emailRef}
                    onChange={(e) => setPassword(e.target.value)}
                    value={Password}
                    required={true}
                    showHidePasswordHandler={setShowPassword}
                    showHidePassword={ShowPassword}
                    ShowHide={true}
                    valid={PasswordValidation}
                  />
                  <Input
                    label="Re-enter Password"
                    type={ShowRePassword ? "text" : "password"}
                    id="RePassword"
                    // ref={emailRef}
                    onChange={(e) => setRePassword(e.target.value)}
                    value={RePassword}
                    required={true}
                    showHidePasswordHandler={setShowRePassword}
                    showHidePassword={ShowRePassword}
                    ShowHide={true}
                    valid={PasswordValidation}
                  />
                  {!PasswordValidation && <p>passwords don't match</p>}
                  {errorMsg && (
                    <p className={styles.errorMessage}>{errorMsg}</p>
                  )}

                  <div className={styles.button}>
                    <Button>Sign Up</Button>
                  </div>
                  <p className={styles.register_button}>
                    Have an account already, click{" "}
                    <span onClick={onSignin} className={styles.here_button}>
                      here
                    </span>{" "}
                    to signin
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
        <div className={styles.image}>
          <h3>Welcome to Calendar Mechanicum</h3>
        </div>
      </div>
    </>
  );
};
