import React, { useEffect, useState } from "react";
import styles from "./Calender.module.scss";
import moment from "moment/moment";

import buildCalender from "./build.service";
import { CalenderDay } from "./CalenderDay/CalenderDay";
import { Input } from "../UI/Input/Input";
import axios from "axios";
import { Button } from "../UI/Button/Button";

export const Calender = ({UpdateCalendarEvents, setUpdateCalendarEvents}) => {
  const [Calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  const [gradientStyles, setGradientStyles] = useState(`${styles.gradient}`);

  useEffect(() => {
    setCalendar(buildCalender(value));
  }, [value]);

  // const onShowEventForm = () => {
  //   setGradientStyles(`${styles.gradient} ${styles.show}`);
  // };

  const onCloseEventForm = () => {
    setGradientStyles(`${styles.gradient}`);
  };

  const onSetValueTodayHandler = () => {
    setValue(moment());
  };

  const subtractOneMonthHandler = () => {
    setValue(value.clone().subtract(1, "month"));
  };

  const addOneMonthHandler = () => {
    setValue(value.clone().add(1, "month"));
  };

  // get all events from db

  const [Events, setEvents] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    const options = {
      method: "GET",
      url: "http://localhost:3200/user/" + userDetails.id,
    };

    axios
      .request(options)
      .then(function (response) {
        setEvents(response.data.events);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [UpdateCalendarEvents]);

  const [EventTitle, setEventTitle] = useState("");
  const [EventDescription, setEventDescription] = useState("");
  const [EventDate, setEventDate] = useState("");

  const [EventData, setEventData] = useState({})

  const [FormCss, setFormCss] = useState(
    `${styles.event_form} ${styles.hide_form}`
  );

  const onEventClick = (e) => {
    const options = {
      method: "GET",
      url: "http://localhost:3200/event/" + e.id,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setFormCss(`${styles.event_form} ${styles.show_form}`);

        setEventTitle(response.data.title);
        setEventDescription(response.data.description);
        setEventDate(moment(response.data.date).format("DD/MM/YYYY"))
        setEventData(response.data)
      })
      .catch(function (error) {
        console.error(error);
        alert("error");
      });

    setFormCss(`${styles.event_form} ${styles.show_form}`);
    // show form

    // get form data
  };

  const onUpdate = () => {
    const options = {
      method: 'PATCH',
      url: 'http://localhost:3200/event/' + EventData.id,
      headers: {'Content-Type': 'application/json'},
      data: {
        title: EventTitle,
        date: moment(EventDate, "DD/MM/YYYY").toISOString(),
        description: EventDescription
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setUpdateCalendarEvents(prevState => !prevState)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const onDelete = () => {
    const options = {
      method: 'DELETE',
      url: 'http://localhost:3200/event/' + EventData.id,
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setUpdateCalendarEvents(prevState => !prevState)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const onCloseForm = () => {
    setFormCss(`${styles.event_form} ${styles.hide_form}`);
  };

  return (
    <div className={styles.calendar}>
      <form className={FormCss}>
        <div className={styles.close}>
          <ion-icon onClick={onCloseForm} name="close-outline"></ion-icon>
        </div>
        <h3>Edit an Event</h3>
        <Input
          label="Title"
          type="text"
          id="title"
          onChange={(e) => setEventTitle(e.target.value)}
          value={EventTitle}
          required={true}
          valid={true}
        />
        <Input
          label="Description"
          type="text"
          id="description"
          onChange={(e) => setEventDescription(e.target.value)}
          value={EventDescription}
          required={true}
          valid={true}
        />
        <Input
          label="date"
          type="text"
          id="date"
          pattern="\d{2}/\d{2}/\d{4}"
          onChange={(e) => setEventDate(e.target.value)}
          value={EventDate}
          required={true}
          valid={true}
        />
         <Button onClick={onUpdate} type="button">
          Update Event
        </Button>
        <Button onClick={onDelete} type="button">
          Delete Event
        </Button>
      </form>
      <div className={styles.topNav}>
        <div className={styles.monthSelect}>
          {/* <div>
                <p>Today day</p>
            </div> */}
          <ion-icon
            onClick={subtractOneMonthHandler}
            name="chevron-back-outline"
          ></ion-icon>
          <ion-icon
            onClick={addOneMonthHandler}
            name="chevron-forward-outline"
          ></ion-icon>
          <h3>{value.format("MMMM YYYY")}</h3>
        </div>
        <div className={styles.buttons}>
          <div
            onClick={onSetValueTodayHandler}
            className={styles.button_container}
          >
            <ion-icon name="today-outline"></ion-icon>
            <h4>Today</h4>
          </div>
          {/* <span className={styles.divider}></span>
          <div className={styles.button_container}>
            <ion-icon name="calendar-outline"></ion-icon>
            <h4>Day</h4>
          </div>
          <div className={styles.button_container}>
            <ion-icon name="calendar-clear-outline"></ion-icon>
            <h4>Month</h4>
          </div> */}
        </div>
      </div>
      <table>
        <thead>
          <tr className={styles.table_row}>
            <th>
              <h3 className={styles.day_title}>Sunday</h3>
            </th>
            <th>
              <h3 className={styles.day_title}>Monday</h3>
            </th>
            <th>
              <h3 className={styles.day_title}>Tuesday</h3>
            </th>
            <th>
              <h3 className={styles.day_title}>Wednesday</h3>
            </th>
            <th>
              <h3 className={styles.day_title}>Thursday</h3>
            </th>
            <th>
              <h3 className={styles.day_title}>Friday</h3>
            </th>
            <th>
              <h3 className={styles.day_title}>Saturday</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {Calendar.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => {
                let eventList = [];
                Events.forEach((event) => {
                  if (moment(event.date).isSame(day, "day")) {
                    eventList.push(event);
                  }
                });
                return (
                  <CalenderDay
                    value={value}
                    key={index}
                    day={day}
                    eventList={eventList}
                    onClickEvent={onEventClick}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
