import { TextField, Box, Button, Typography, Alert } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase/config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase/config";
const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const handleForm = (event) => {
    event.preventDefault();
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;
    const displayName = name.current.value;

    createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword,
      displayName
    )
      .then(async (userCredential) => {
        // Signed up
        setLoading(true);
        const user = userCredential.user;
        console.log(user);
        await updateProfile(user, {
          displayName: displayName,
        });
        try {
          const docRef = await addDoc(collection(db, "users"), {
            user_name : displayName,
            email :  registerEmail
            });

          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setLoading(false);
        navigate("/home");
        email.current.value = "";
        password.current.value = "";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorMessage);
        setErrorMessage(errorCode);
        setLoading(false);
        // ..
      });
  };

  return (
    <>
      <Box className="container d-flex justify-content-center align-items-center gap-5 flex-column mt-5">
        <Typography variant="h3">Sign Up</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box className="row">
          <form onSubmit={handleForm}>
            <TextField
              id="outlined-basic"
              inputRef={name}
              label="UserName"
              variant="outlined"
              className="my-3"
              type="text"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              inputRef={email}
              label="Email"
              variant="outlined"
              className="my-3"
              type="email"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              inputRef={password}
              type="password"
              label="Password"
              variant="outlined"
              className="my-3"
              fullWidth
            />
            <Box>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Register;
