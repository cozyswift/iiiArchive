import React from "react";
import { useCallback, useState } from "react";
import { useSignIn } from "../../services/auth.service";
import {
  SignForm,
  ActualForm,
  Legend,
  Section,
  TextField,
  Button,
  ErrorMessage
} from "./form-components";
import { RouteComponentProps } from "react-router-dom";

function SignInForm({ history }: RouteComponentProps<any>) {
  const [archivistID, setArchivistID] = useState("");
  const [archivistPW, setArchivistPW] = useState("");
  const [error, setError] = useState("");
  const [signIn] = useSignIn();

  const onArchivistIdChange = useCallback(({ target }) => {
    setError("");
    setArchivistID(target.value);
  }, []);

  const onArchivistPwChange = useCallback(({ target }) => {
    setError("");
    setArchivistPW(target.value);
  }, []);

  const maySignIn = useCallback(() => {
    return !!(archivistID && archivistPW);
  }, [archivistID, archivistPW]);

  const handleSignIn = useCallback(() => {
    signIn({ variables: { archivistID, archivistPW } })
      .then(() => {
        history.replace("/chats");
      })
      .catch(error => {
        setError(error.message || error);
      });
  }, [archivistID, archivistPW, history, signIn]);

  return (
    <SignForm>
      <ActualForm>
        <Legend>Sign in</Legend>
        <Section style={{ width: "100%" }}>
          <TextField
            data-testid="username-input"
            label="Username"
            value={archivistID}
            onChange={onArchivistIdChange}
            margin="normal"
            placeholder="Enter your username"
          />
          <TextField
            data-testid="password-input"
            label="Password"
            type="password"
            value={archivistPW}
            onChange={onArchivistPwChange}
            margin="normal"
            placeholder="Enter your password"
          />
        </Section>
        <Button
          data-testid="sign-in-button"
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignIn()}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
      </ActualForm>
    </SignForm>
  );
}

export default SignInForm;
