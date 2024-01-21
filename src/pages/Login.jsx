import { TextField, Box, Button, Typography, Alert } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase/config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const handleForm = (e) => {
    e.preventDefault();
    const loginEmail = email.current.value;
    const loginPassword = password.current.value;
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        email.current.value = "";
        password.current.value = "";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
      });
  };

  return (
    <>
      <Box className="container d-flex justify-content-center align-items-center gap-5 flex-column mt-5">
        <Typography variant="h3">Log In</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
               <Box className="row">
          <form onSubmit={handleForm}>
            <TextField
              label="Email"
              variant="outlined"
              id="outlined-basic"
              type="email"
              inputRef={email}
              className="my-3"
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              id="outlined-basic"
              inputRef={password}
              variant="outlined"
              className="my-3"
              fullWidth
            />

            <Box className=" col-md-8 ">
              <Button
                variant="contained"
                type="submit"
              >
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
