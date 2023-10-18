import React, { useEffect, useState } from "react";
import styles from "./Calender.module.scss";
import moment from "moment/moment";

import buildCalender from "./build.service";
import { CalenderDay } from "./CalenderDay/CalenderDay";

export const Calender = () => {
  const [Calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalender(value));
  }, [value]);

  const onSetValueTodayHandler = () => {
    setValue(moment());
  };

  const subtractOneMonthHandler = () => {
    setValue(value.clone().subtract(1, "month"));
  };

  const addOneMonthHandler = () => {
    setValue(value.clone().add(1, "month"));
  };

  const events = [
    {
      id: 1,
      title: "Event 1",
      desc: "Description 1",
      color: "#badc58",
      date: "2023-10-18",
    },
    {
      id: 2,
      title: "Event 1",
      desc: "Description 1",
      color: "#58DC75",
      date: "2023-10-9",
    },
    {
      id: 5,
      title: "Event 1",
      desc: "Description 1",
      color: "#58DC75",
      date: "2023-10-9",
    },
    {
      id: 3,
      title: "Event 1",
      desc: "Description 1",
      color: "#58DC75",
      date: "2023-10-9",
    },
    {
      id: 4,
      title: "Event 1",
      desc: "Description 1",
      color: "#58DC75",
      date: "2023-10-9",
    },
  ];

  return (
    <div className={styles.calendar}>
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
          <span className={styles.divider}></span>
          <div className={styles.button_container}>
            <ion-icon name="calendar-outline"></ion-icon>
            <h4>Day</h4>
          </div>
          <div className={styles.button_container}>
            <ion-icon name="calendar-clear-outline"></ion-icon>
            <h4>Month</h4>
          </div>
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
                events.forEach((event) => {
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
