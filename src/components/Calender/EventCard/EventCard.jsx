import React from "react";
import styles from "./EventCard.module.scss";

export const EventCard = ({ event, onClickEvent }) => {

  const onclick = () => {
    onClickEvent(event)
  }

  return (
    <div
      onClick={onclick}
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
        {event.description.length > 40
          ? event.description.substring(0, 10) + "..."
          : event.description}
      </p>
    </div>
  );
};
