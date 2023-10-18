import React from "react";
import styles from "./EventCard.module.scss";

export const EventCard = ({ event }) => {
  return (
    <div
      style={{
        backgroundColor: event.color,
      }}
      className={styles.card}
    >
      <h6>
        {event.title.length > 10
          ? event.title.substring(0, 10) + "..."
          : event.title}
      </h6>
      <p>
        {event.desc.length > 40
          ? event.desc.substring(0, 10) + "..."
          : event.desc}
      </p>
    </div>
  );
};
