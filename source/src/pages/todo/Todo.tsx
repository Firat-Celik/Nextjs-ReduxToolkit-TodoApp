import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { addTodo, removeTodo, editTodo, completeTodo, clearTodo, recoverTodo } from "../../store/features/todoSlice";
import type { Todo } from "../../store/features/todoSlice";
import styles from "./Todo.module.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Todo: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");

  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      dispatch(addTodo({ description: value }));
      setValue("");
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo({ id }));
  };

  const handleEditTodo = (id: number, description: string) => {
    setEditId(id);
    setEditValue(description);
    setOpen(true);
  };

  const handleUpdateTodo = () => {
    if (editId !== null && editValue.trim()) {
      dispatch(editTodo({ id: editId, description: editValue }));
      setEditId(null);
      setEditValue("");
      setOpen(false);
    }
  };

  const handleCompleteTodo = (id: number) => {
    dispatch(completeTodo({ id }));
    setFilter("completed");
  };

  const handleClearCompleted = () => {
    dispatch(clearTodo());
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "active") return !todo.isComplete && !todo.isDelete;
    if (filter === "completed") return todo.isComplete && !todo.isDelete;
    if (filter === "deleted") return todo.isDelete;
    return !todo.isDelete;
  });

  const activeTodosCount = todos.filter((todo: Todo) => !todo.isComplete && !todo.isDelete).length;
  const completedTodosCount = todos.filter((todo: Todo) => todo.isComplete && !todo.isDelete).length;
  const deletedTodosCount = todos.filter((todo: Todo) => todo.isDelete).length;

  return (
      <div className={styles.todoapp}>
        <header className={styles.header}>
          <h1>Yapılacaklar</h1>
          <form onSubmit={handleAddTodo} className={styles.inputContainer}>
            <input
                type="text"
                className={styles.newTodo}
                placeholder="Ne Eklemek İstersin?"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                className={styles.addButton}
            >
              Ekle
            </Button>
          </form>
        </header>

        <section className={styles.main}>
          <ul className={styles.todoList}>
            {filteredTodos.map((todo: Todo) => (
                <li key={todo.id} className={`${styles.todoItem} ${todo.isComplete ? 'completed' : ''}`}>
                  <div className={styles.view}>
                    <input
                        type="radio"
                        className={styles.radioInput}
                        checked={todo.isComplete}
                        onChange={() => handleCompleteTodo(todo.id)}
                    />
                    <span className={styles.todoLabel}>{todo.description}</span>
                    {filter === "deleted" ? (
                        <Button
                            onClick={() => dispatch(recoverTodo({ id: todo.id }))}
                            color="primary"
                            size="small"
                            variant="contained"
                        >
                          Kurtar
                        </Button>
                    ) : (
                        <div>
                          <Button
                              onClick={() => handleEditTodo(todo.id, todo.description)}
                              color="primary"
                              size="small"
                              startIcon={<BorderColorIcon />}
                          >
                            Düzenle
                          </Button>
                          <Button
                              onClick={() => handleRemoveTodo(todo.id)}
                              color="error"
                              size="small"
                              startIcon={<DeleteIcon />}
                          >
                            Sil
                          </Button>
                        </div>
                    )}
                  </div>
                </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <ul className={styles.filters}>
            <li>
              <a
                  href="#"
                  className={filter === "all" ? styles.selected : ""}
                  onClick={() => setFilter("all")}
              >
                Tümü
              </a>
            </li>
            <li>
              <a
                  href="#"
                  className={filter === "active" ? styles.selected : ""}
                  onClick={() => setFilter("active")}
              >
                Aktif
              </a>
            </li>
            <li>
              <a
                  href="#"
                  className={filter === "completed" ? styles.selected : ""}
                  onClick={() => setFilter("completed")}
              >
                Tamamlanan
              </a>
            </li>
            <li>
              <a
                  href="#"
                  className={filter === "deleted" ? styles.selected : ""}
                  onClick={() => setFilter("deleted")}
              >
                Silinen
              </a>
            </li>
          </ul>
          <span className={styles.footerRight}>{activeTodosCount} adet görev kaldı</span>
        </footer>

        {completedTodosCount > 0 && (
            <button className={styles.clearCompleted} onClick={handleClearCompleted}>
              Tamamlananları Temizle ({completedTodosCount})
            </button>
        )}

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
          >
            <Typography variant="h6" component="h2" mb={2}>
              Edit Todo
            </Typography>
            <TextField
                fullWidth
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className={styles.editInput}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateTodo}
                fullWidth
                sx={{ mt: 2 }}
            >
              Güncelle
            </Button>
          </Box>
        </Modal>
      </div>
  );
};

export default Todo;