import React, { useEffect, useState } from "react";
import styles from "./Dock.module.scss";
import { Button } from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { Input } from "../UI/Input/Input";

import { Textarea } from "../UI/Textarea/Textarea";

import botImg from "../../assets/images/robot.png";
import userImg from "../../assets/images/user.png";
import axios from "axios";

export const Dock = ({setUpdateCalendarEvents}) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const [UserDetails, setUserDetails] = useState({});
  const [MessageInput, setMessageInput] = useState("I have a meeting at 10:00 on the 31st of december with Dillon to discus plans, can you make an event for me.");

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  const [ChatLog, setChatLog] = useState([
    {
      source: "bot",
      message: "Hello how can I help you today?",
    }
  ]);

  const onSendMessage = (e) => {
    e.preventDefault();
    setChatLog(prevState => [...prevState, { source: "user", message: MessageInput }])

    const options = {
      method: 'POST',
      url: 'http://localhost:3200/event/ai',
      headers: {'Content-Type': 'application/json'},
      data: {
        message: MessageInput,
        userId : UserDetails.id
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setUpdateCalendarEvents(prevState => !prevState)
      setChatLog(prevState => [...prevState, { source: "bot", message: "Sure thing here you go!" }])
    }).catch(function (error) {
      console.error(error);
      setChatLog(prevState => [...prevState, { source: "bot", message: "Oh no there was a error can you help me fix it." }])
    });

    setMessageInput("");

  };

  return (
    <section className={styles.dock}>
      <div className={styles.bg_image}></div>
      <div className={styles.dock_content}>
        <h1>Calendar Mechanicum</h1>
        <p>
          Welcome {UserDetails.firstName + " " + UserDetails.lastName} to your
          calendar
        </p>
        <Button onClick={onLogout} type="button">
          Logout
        </Button>
        {/* <p>Here is all your activityes for today</p>
        <hr />
        <p>nothing for today!</p> */}
        
      </div>

      {/* <div className={styles.bg_text}>
        <p>icon</p>
        <p>+ new event</p>
        <p>Calender</p>
        <p>Settings</p>
        <p>Logout</p>
      </div> */}
      <div className={styles.chat_box}>
        <div className={styles.chat}>
          {ChatLog.map((chat, index) => {
            if (chat.source === "bot") {
              return (
                <div key={index} className={styles.chat_message}>
                  <img src={botImg} />
                  <p className={styles.bot}>{chat.message}</p>
                </div>
              );
            } else {
              return (
                <div key={index} className={styles.chat_message}>
                  <p className={styles.user}>{chat.message}</p>
                  <img className={styles.userImage} src={userImg} />
                </div>
              );
            }
          })}
        </div>
        <form autoComplete="off" onSubmit={onSendMessage} className={styles.chat_message_input}>
          <div className={styles.input_container}>
            <Textarea
              label="Message"
              type="text"
              id="message"
              hasIcon = {false}
              // ref={emailRef}
              onChange={(e) => setMessageInput(e.target.value)}
              value={MessageInput}
              required={true}
              valid={true}
            />
          </div>

          <ion-icon onClick={onSendMessage} name="send-outline"></ion-icon>
        </form>
      </div>
    </section>
  );
};
