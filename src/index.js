import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import { Text } from "rebass";
import { initializeApp, firestore } from "firebase";

import "firebase/firestore";

initializeApp({
  apiKey: "AIzaSyDLT_4fVRwW4lpT0H45DRtK9SqFcLc9fis",
  authDomain: "rutabaga-14cd7.firebaseapp.com",
  databaseURL: "https://rutabaga-14cd7.firebaseio.com",
  projectId: "rutabaga-14cd7",
  storageBucket: "rutabaga-14cd7.appspot.com",
  messagingSenderId: "169894290399",
  appId: "1:169894290399:web:69dff23d1161985a"
});

var db = firestore();

db.collection("targets")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(doc.data());
    });
  });

const App = () => (
  <ThemeProvider theme={theme}>
    <Text>Hello, world!</Text>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
