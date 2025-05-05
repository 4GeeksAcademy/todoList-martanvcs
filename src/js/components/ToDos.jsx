import React, { useState } from "react";

const ToDos = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, idx) => idx !== index));
  };

  return (
    <div className="todo-container">
      <h1>My ToDoList :)</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="¿Qué necesitas hacer?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleAddTask}
          />
        </li>
        {tasks.length === 0 ? (
          <li className="no-task">No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
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
      <div className="tasks-left">{tasks.length} tarea(s) pendiente(s)</div>
    </div>
  );
};

export default ToDos;
