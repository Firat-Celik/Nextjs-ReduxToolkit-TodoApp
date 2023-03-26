import React, { useEffect, useRef, useState } from "react";
import "../todo/Todo.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Button from "@mui/material/Button";
import {
  addTodo,
  clearTodo,
  completeTodo,
  editTodo,
  removeTodo,
} from "../../store/features/todoSlice";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal/Modal";
import { Box, Tooltip, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
function Todo() {
  //region setValue
  const [value, setValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [valueId, setValueId] = useState(0);
  const [open, setOpen] = React.useState(false);
  //endregion setValue

  //region setSettings
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid white",
    boxShadow: 4,
    borderRadius: 3,
    p: 4,
  };

  const todos = useAppSelector((state) => state.todo);

  const dispatch = useAppDispatch();
  //endregion setSettings

  //region setFunctions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function addTodos() {
    dispatch(addTodo({ description: value }));
  }

  function removeItem(id: number) {
    dispatch(removeTodo({ id: id }));
  }

  function completedTodo(id: number) {
    dispatch(completeTodo({ id: id }));
  }

  function editTodos(description: string, id: number) {
    console.log("idsi", id);
    dispatch(editTodo({ description: description, id: id }));
  }

  function deleteTodo() {
    dispatch(clearTodo());
  }
  //endregion setFunctions setSettings

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>Yapılacaklar</h1>
          <input
            className="new-todo"
            placeholder="Ne Yapmayı Düşünüyorsun?"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            size={"small"}
            style={{ float: "right", padding: 5, margin: 5 }}
            onClick={() => addTodos()}
            startIcon={<SaveIcon />}
          >
            Ekle
          </Button>
        </header>
        <br />
        <br />

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Tamamlananlar</label>

          <ul className="todo-list">
            {todos.todos.map((todo) =>
              todo.isActive ? (
                <li className="completed" key={todo.id}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      onClick={() => completedTodo(todo.id)}
                    />
                    <Tooltip
                      title="Düzenlemek İçin Yazıya Tıklayın"
                      placement="left"
                      arrow
                    >
                      <label>
                        <span
                          onClick={(e) => {
                            handleOpen();
                            setChangeValue(todo.description);
                            setValueId(todo.id);
                          }}
                        >
                          {todo.description}
                        </span>{" "}
                      </label>
                    </Tooltip>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          style={{ textAlign: "center" }}
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Görev Düzenle
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <input
                            style={{
                              color: "white",
                              backgroundColor: "#03a9f4",
                            }}
                            className="new-todo"
                            autoFocus
                            value={changeValue}
                            onChange={(e) => setChangeValue(e.target.value)}
                          />
                          <br />
                          <Button
                            variant="contained"
                            size={"small"}
                            style={{ float: "right", marginTop: 5 }}
                            onClick={(e) => {
                              editTodos(changeValue, valueId);
                              setOpen(false);
                            }}
                            startIcon={<BorderColorIcon />}
                          >
                            Güncelle
                          </Button>
                        </Typography>
                      </Box>
                    </Modal>
                    <DeleteIcon
                      onClick={() => removeItem(todo.id)}
                      className="destroy"
                    />
                  </div>
                </li>
              ) : (
                <div></div>
              )
            )}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.isActiveCount} </strong>
            görev mevcut
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                <strong>{todos.isTotalCount} </strong>
                Tümü
              </a>
            </li>
            <li>
              <strong>{todos.isDeleteCount} </strong>
              <a href="#/">Silinmiş</a>
            </li>
            <li>
              <strong>{todos.isCompleteCount} </strong>
              <a href="#/">Tamamlanan</a>
            </li>
          </ul>

          <button className="clear-completed" onClick={() => deleteTodo()}>
            Tümünü Sil
          </button>
        </footer>
      </section>
    </div>
  );
}

export default Todo;
