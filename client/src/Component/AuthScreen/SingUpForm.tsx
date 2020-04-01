import React from "react";
import { useCallback, useState } from "react";
import { useSignUp } from "../../services/auth.service";
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

const SignUpForm: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [name, setName] = useState("");
  const [archivistID, setArchivistID] = useState("");
  const [archivistPW, setArchivistPW] = useState("");
  const [eMail, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [signUp] = useSignUp();

  const updateName = useCallback(({ target }) => {
    setError("");
    setName(target.value);
  }, []);

  const updateEmail = useCallback(({ target }) => {
    setError("");
    setEmail(target.value);
  }, []);

  const updateArchivistId = useCallback(({ target }) => {
    setError("");
    setArchivistID(target.value);
  }, []);

  const updateArchivistPw = useCallback(({ target }) => {
    setError("");
    setArchivistPW(target.value);
  }, []);

  const updatePasswordConfirm = useCallback(({ target }) => {
    setError("");
    setPasswordConfirm(target.value);
  }, []);

  const maySignUp = useCallback(() => {
    return !!(
      name &&
      eMail &&
      archivistID &&
      archivistPW &&
      archivistPW === passwordConfirm
    );
  }, [name, archivistID, archivistPW, passwordConfirm]);

  const handleSignUp = useCallback(() => {
    signUp({ variables: { archivistID, archivistPW, passwordConfirm, name,eMail } })
      .then(() => {
        history.replace("/sign-in");
      })
      .catch(error => {
        setError(error.message || error);
      });
  }, [name, archivistID, archivistPW, passwordConfirm, history, signUp]);

  return (
    <SignForm>
      <ActualForm>
        <Legend>Sign up</Legend>
        <Section
          style={{
            float: "left",
            width: "calc(50% - 10px)",
            paddingRight: "10px"
          }}
        >
          <TextField
            data-testid="name-input"
            label="이름"
            value={name}
            onChange={updateName}
            autoComplete="off"
            margin="normal"
          />

          <TextField
            data-testid="name-input"
            label="E-mail"
            value={eMail}
            onChange={updateEmail}
            autoComplete="off"
            margin="normal"
          />
          <TextField
            data-testid="username-input"
            label="아이디"
            value={archivistID}
            onChange={updateArchivistId}
            autoComplete="off"
            margin="normal"
          />
        </Section>
        <Section
          style={{
            float: "right",
            width: "calc(50% - 10px)",
            paddingLeft: "10px"
          }}
        >
          <TextField
            data-testid="password-input"
            label="비밀번호"
            type="password"
            value={archivistPW}
            onChange={updateArchivistPw}
            autoComplete="off"
            margin="normal"
          />
          <TextField
            data-testid="password-confirm-input"
            label="비밀번호확인"
            type="password"
            value={passwordConfirm}
            onChange={updatePasswordConfirm}
            autoComplete="off"
            margin="normal"
          />
        </Section>
        <Button
          data-testid="sign-up-button"
          type="button"
          color="secondary"
          variant="contained"
          disabled={!maySignUp()}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
        <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
      </ActualForm>
    </SignForm>
  );
};

export default SignUpForm;
