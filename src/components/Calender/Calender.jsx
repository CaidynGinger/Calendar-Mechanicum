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

  return (
    <div className={styles.calendar}>
      <div className={styles.topNav}>
        <div className={styles.monthSelect}>
        
          <ion-icon name="chevron-back-outline"></ion-icon>
          <ion-icon name="chevron-forward-outline"></ion-icon>
          <h3>{value.format("MMMM YYYY")}</h3>
        </div>
      </div>

      {/* <div>
        <p>{"<-   -> March 2023"}</p>
        <p>Today</p>
        <p>Day</p>
        <p>Week</p>
        <p>Month</p>
      </div> */}
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
                return <CalenderDay key={index} day={day} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
