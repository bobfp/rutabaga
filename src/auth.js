import React from "react";
import { useState, useEffect, useRef } from "react";
import union from "folktale/adt/union/union";
import { initializeApp, firestore, auth } from "firebase";
import { Grommet, Text, Box, Button } from "grommet";
import { Main } from "./Main.js";

export const AuthState = union("AuthState", {
  LoggedOut: () => {},
  LoggedIn: user => ({
    user
  }),
  Undetermined: () => {}
});

const useAuth = () => {
  const [loginState, setLoginState] = useState(AuthState.Undetermined());
  useEffect(() => {
    auth()
      .getRedirectResult()
      .then(result => {
        if (result.user === null) {
          setLoginState(AuthState.LoggedOut());
        } else {
          setLoginState(AuthState.LoggedIn(result.user));
        }
      })
      .catch(error => {
        setLoginState(AuthState.LoggedOut());
        console.warn(error);
      });
  }, []);
  return loginState;
};

export const Login = ({ children }) => {
  const providerRef = useRef(() => new auth.GoogleAuthProvider(), []);
  const authState = useAuth();
  const logIn = () => auth().signInWithRedirect(providerRef.current());
  return authState.matchWith({
    LoggedIn: ({ user }) => <Main user={user} />,
    LoggedOut: () => (
      <Box direction="column" justify="center" align="center" fill>
        <Text>Rutabaga</Text>
        <Button primary onClick={logIn} label="Log In" />
      </Box>
    ),
    Undetermined: () => (
      <Box direction="column" justify="center" align="center" fill>
        <Text>Loading...</Text>
      </Box>
    )
  });
};
