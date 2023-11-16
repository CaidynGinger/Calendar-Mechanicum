import { Dock } from "./components/Dock/Dock";
import styles from "./App.module.scss";

import React, { useEffect, useState } from "react";
import { Calender } from "./components/Calender/Calender";
import { useNavigate } from "react-router-dom";

export const App = () => {

  const navigate = useNavigate()
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails === null) {
      navigate('/login')
    }
  }, [])


  const [UpdateCalendarEvents, setUpdateCalendarEvents] = useState(true)
  
  return (
    <div className={styles.container}>
      <div className={styles.dock_container}>
        <Dock  setUpdateCalendarEvents={setUpdateCalendarEvents}/>
      </div>
      <div className={styles.calendar_container}>
        <Calender setUpdateCalendarEvents={setUpdateCalendarEvents} UpdateCalendarEvents={UpdateCalendarEvents} />
      </div>
    </div>
  );
};

// function App() {
//   return (
//     <h1>hello world</h1>
//     // <section className={styles.container}>
//     //   <Dock />
//     //   <div>
//     //     <h1>hello world</h1>
//     //   </div>
//     // </section>
//   );
// }

// export default App;
