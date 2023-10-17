import React from 'react'
import styles from "./CalenderDay.module.scss";

export const CalenderDay = ({day}) => {

    // console.log();
    const dayDisplay = day.format("D").toString()
    // const day = props.day.day.format("D").toString();
    return (
      <td className={styles.single_day}>
        <div className={styles.cell_content}>
          {dayDisplay}
          {/* {props.day.appointments.map((appointment) => {
            return (
              <React.Fragment key={appointment.id}>
                <AppointmentCard appointment={appointment} />
                <div className={classes.brake}></div>
              </React.Fragment>
            );
          })} */}
        </div>
      </td>
    );
  };
  