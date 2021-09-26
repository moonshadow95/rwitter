import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import "./reset.css";
import styles from "./app.module.css";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const defaultURL =
    "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-user-user-flatart-icons-outline-flatarticons-9.png";
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName ? user.displayName : "Anonymous User",
          uid: user.uid,
          email: user.email,
          photoURL: authService.currentUser.photoURL || defaultURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL || defaultURL,
      email: user.email,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <div className={`${styles.container} ${init || styles.notinit}`}>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <ul className={styles.spinner}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      )}
    </div>
  );
}

export default App;
