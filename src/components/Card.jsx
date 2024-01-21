import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";

function ImgMediaCard({ title, deleteTodo, editTodo, index }) {
  const editedValue = useRef();
  const [showInput, setShowInput] = useState(false);
  const handleEditedClick = () => {
    editTodo(index, editedValue.current.value);
    setShowInput(false);
  };
  return (
    <Card sx={{ maxWidth: 345 }} className="my-1">
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="overflow-y"
        >
          {title}
        </Typography>
      </CardContent>
      {!showInput ? (
        <CardActions>
          <Button
            className="btn btn-danger btn-sm"
            variant="outlined"
            onClick={deleteTodo}
          >
            Delete
          </Button>
          <Button
            className="btn btn-info btn-sm text-light"
            onClick={()=> setShowInput(true)}
          >
            Edit
          </Button>
        </CardActions>
      ) : (
        <div className="my-2">
          <TextField
            id="filled-basic"
            inputRef={editedValue}
            label="Edit Todo"
            variant="filled"
            className="my-3 p-2"
            fullWidth
          />
          <Button
            className="btn btn-info btn-sm text-light mx-2"
            onClick={handleEditedClick}
          >
            save
          </Button>
          <Button
            className="btn btn-dark btn-sm text-light"
            onClick={() => setShowInput(false)}
          >
            cancel
          </Button>
        </div>
      )}
    </Card>
  );
}
export default ImgMediaCard;
