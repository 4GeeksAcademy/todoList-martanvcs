import React, { useEffect, useState } from "react";

const USERNAME = "martanvcs"; 
const API_URL = `https://playground.4geeks.com/apis/fake/todos/${USERNAME}`;

const ToDos = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    createUser();
  }, []);

  const createUser = () => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify([]),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (!res.ok && res.status !== 400) throw new Error();
        return res.json();
      })
      .then(() => fetchTasks())
      .catch(() => {});
  };

  const fetchTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  const updateTasks = (newTasks) => {
    return fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => fetchTasks())
      .catch(() => setTasks(newTasks));
  };

  const handleAddTask = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTasks = [...tasks, { label: input.trim(), done: false }];
      updateTasks(newTasks);
      setInput("");
    }
  };

  const handleButtonAddTask = () => {
    if (input.trim() !== "") {
      const newTasks = [...tasks, { label: input.trim(), done: false }];
      updateTasks(newTasks);
      setInput("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    updateTasks(newTasks);
  };

  const clearAllTasks = () => {
    fetch(API_URL, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error();
        setTasks([]);
      })
      .catch(() => setTasks([]));
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        placeholder="Escribe una tarea y presiona Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleAddTask}
      />
      <button className="btn-add" onClick={handleButtonAddTask}>
        Añadir
      </button>

      <ul>
        {tasks.length === 0 ? (
          <li className="no-task">No hay tareas</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task.label}
              <span
                className="delete-task"
                onClick={() => handleDeleteTask(index)}
              >
                ×
              </span>
            </li>
          ))
        )}
      </ul>

      <button className="btn-warning" onClick={clearAllTasks}>
        Eliminar todas las tareas
      </button>
      <p>{tasks.length} tarea(s) pendiente(s)</p>
    </div>
  );
};

export default ToDos;


