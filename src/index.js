import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { initializeApp, firestore, auth } from "firebase";
import { Grommet, Text, Box, Button } from "grommet";
import { Login } from "./auth.js";

import "firebase/firestore";
import "normalize.css";

initializeApp({
  apiKey: "AIzaSyDLT_4fVRwW4lpT0H45DRtK9SqFcLc9fis",
  authDomain: "rutabaga-14cd7.firebaseapp.com",
  databaseURL: "https://rutabaga-14cd7.firebaseio.com",
  projectId: "rutabaga-14cd7",
  storageBucket: "rutabaga-14cd7.appspot.com",
  messagingSenderId: "169894290399",
  appId: "1:169894290399:web:69dff23d1161985a"
});

const theme = {
  global: {
    font: {}
  }
};

const App = () => {
  return (
    <Grommet theme={theme}>
      <Login />
    </Grommet>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
