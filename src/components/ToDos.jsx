import React, { useEffect, useState } from "react";
const USERNAME = "martanvcs";
const API_BASE = "https://playground.4geeks.com/todo";

const ToDos = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

 
  useEffect(() => {
    fetch(`${API_BASE}/users/${USERNAME}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res.ok) console.log("✅ Usuario creado");
        else if (res.status === 400) console.log("⚠️ Usuario ya existe");
        else throw new Error("❌ Error al crear usuario");
      })
      .then(fetchTasks)
      .catch((err) => console.error("Error:", err));
  }, []);

  const fetchTasks = () => {
    fetch(`${API_BASE}/users/${USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar tareas");
        return res.json();
      })
      .then((data) => setTasks(data.todos || []))
      .catch((err) => console.error(err));
  };

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    fetch(`${API_BASE}/todos/${USERNAME}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: trimmed, is_done: false }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewTask("");
        fetchTasks();
      })
      .catch((err) => console.error(err));
  };

  
  const handleDelete = (id) => {
    fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" })
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  };

 
  const handleClearAll = () => {
    Promise.all(tasks.map((t) =>
      fetch(`${API_BASE}/todos/${t.id}`, { method: "DELETE" })
    ))
      .then(() => setTasks([]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow rounded-4">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">📝 Lista de Tareas</h3>

          <div className="input-group mb-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              className="form-control"
              placeholder="Nueva tarea..."
            />
            <button className="btn btn-primary" onClick={handleAddTask}>
              Añadir
            </button>
          </div>

          {tasks.length === 0 ? (
            <p className="text-muted text-center">No hay tareas. ¡Agrega una!</p>
          ) : (
            <ul className="list-group mb-3">
              {tasks.map((task) => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {task.label}
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(task.id)}>
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}

          {tasks.length > 0 && (
            <div className="d-grid">
              <button className="btn btn-danger" onClick={handleClearAll}>
                Limpiar todas las tareas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDos;

