import { useRef, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  updateDoc,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase/config";
import { TextField, Box, Button, Typography } from "@mui/material";
import ImgMediaCard from "../../components/Card";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase/config";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    getUserTodo()
  }, []);

  const addTodo = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: addTodo.current.value,
        userId: currentUser.uid,
      });

      getUserTodo();

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    addTodo.current.value = "";
  };


  // Get specific user todo
  const getUserTodo = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", currentUser.uid)
    );
    const querySnapShot = await getDocs(q);
    const todosData = [];
    querySnapShot.forEach((doc) => {
      todosData.push({ id: doc.id, ...doc.data() });
      console.log(doc.data());
    });
    setData(todosData);
  };
  getUserTodo();


  //    Deleteing Todo
  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
    } catch (e) {
      console.log(e);
    }
    getUserTodo();
  };



  // edit Todo
  const editTodo = async (todoId, value) => {
    const updatedValue = doc(db, "todos", todoId);
    await updateDoc(updatedValue, {
      title: value,
    });
    getUserTodo()
  };

  return (
    <>
      <Box className="container d-flex justify-content-center align-items-center gap-5 flex-column mt-5">
        <Typography variant="h3">Add Todo</Typography>
        <Box className="row">
          <form onSubmit={handleForm}>
            <TextField
              id="standard-basic"
              inputRef={addTodo}
              label="Add Todo"
              variant="standard"
              className="my-3"
              fullWidth
            />

            <Box className=" col-md-8 ">
              <Button variant="contained" type="submit">
                Add Todo
              </Button>
            </Box>
          </form>
        </Box>
        {data.length > 0 ? (
          data.map((todo) => (
            <div key={todo.id}>
              <Box sx={{ width: 345 }}>
                <ImgMediaCard
                  title={todo.title}
                  index={todo.id}
                  deleteTodo={() => deleteTodo(todo.id)}
                  editTodo={editTodo}
                />
              </Box>
            </div>
          ))
        ) : (
          <Typography variant="h5">No Todo Found..</Typography>
        )}
      </Box>
    </>
  );
};

export default Home;
