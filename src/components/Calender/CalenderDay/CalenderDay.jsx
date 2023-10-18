import React from "react";
import styles from "./CalenderDay.module.scss";
import moment from "moment";
import { EventCard } from "../EventCard/EventCard";

export const CalenderDay = ({ day, value, eventList }) => {
  console.log(eventList);
  const dayDisplay = day.format("D").toString();
  let cell_content = styles.cell_content;

  if (day.month() !== value.month()) {
    cell_content = styles.cell_content + " " + styles.grayOut;
  }

  // check if day is today
  if (day.isSame(moment(), "day")) {
    cell_content = styles.cell_content + " " + styles.today;
  }

  // const day = props.day.day.format("D").toString();
  return (
    <td className={styles.single_day}>
      <span>{dayDisplay}</span>
      <div className={cell_content}>
        {eventList.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </td>
  );
};
