import React from 'react'
import styles from './Dock.module.scss'
export const Dock = () => {
  return (
    <section className={styles.dock}>
      <div className={styles.bg_image}></div>
      <div className={styles.bg_text}>
        <p>icon</p>
        <p>+ new event</p>
        <p>Calender</p>
        <p>Settings</p>
        <p>Logout</p>
      </div>
    </section>
  )
}
