import { Dock } from "./components/Dock/Dock";
import styles from "./App.module.scss";

import React from "react";
import { Calender } from "./components/Calender/Calender";

export const App = () => {
  return (
    <div className={styles.container}>
      <Dock />
      <Calender />
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
