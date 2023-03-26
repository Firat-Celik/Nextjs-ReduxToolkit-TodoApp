import React, { useEffect, useRef, useState } from "react";
import "../todo/Todo.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Button from "@mui/material/Button";
import {addTodo, completeTodo, editTodo, removeTodo} from "../../store/features/todoSlice";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal/Modal";
import {Box,  Typography} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
function Todo() {
  const [value, setValue] = useState("");
  const [changValue, setchangeValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid blue',
    boxShadow: 4,
    p: 4,
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const todos = useAppSelector((state) => state.todo);

  const dispatch = useAppDispatch();

  function addTodos() {
    dispatch(addTodo({ description: value }));
  }

  function removeItem(id: number) {
    dispatch(removeTodo({ id: id }));
  }

  function completedTodo(id: number) {
    dispatch(completeTodo({ id: id }));
  }

  function editTodos(description: string,id:number) {
    dispatch(editTodo({description:description ,id: id }));
  }

  return (
    <div>
      <section className="todoapp">
        <header className="header mt-5">
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
            style={{ float: "right" }}
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
                    <input className="toggle" type="checkbox" onClick={()=>completedTodo(todo.id)} />
                    <label  ><span   onClick={e => {handleOpen(); setchangeValue(todo.description)}} >{todo.description}</span> </label>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                         Görev Düzenle
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <input
                              className="new-todo"
                              autoFocus
                              value={changValue}
                              onChange={(e) => setchangeValue(e.target.value)}

                          />
                          <Button
                              variant="contained"
                              size={"small"}
                              style={{ float: "right" }}
                              onClick={() => editTodos(changValue,todo.id)}
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

          <button className="clear-completed">Tümünü Sil</button>
        </footer>
      </section>
    </div>
  );
}

export default Todo;
