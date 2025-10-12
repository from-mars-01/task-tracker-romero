import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
    // fetchTask(); // Add this line if you implement fetchTask function
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) console.error("Fetch error:", error);
    else setTasks(data);
  }

  async function addTask() {
    if (!task) return;
    const { data, error } = await supabase.from("tasks").insert([{ content: task }]);
    if (error) console.error("Insert error:", error);
    else {
      setTask("");
      fetchTasks(); // Refresh the list
    }
  }

  return (
    <div className="container mt-4">
      <h3>Task Tracker</h3>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter a new task"
      />
      <button className="btn btn-primary mb-3" onClick={addTask}>
        Add Task
      </button>

      <ul className="list-group">
        {tasks.map((t) => (
          <li key={t.id} className="list-group-item">
            {t.content}
          </li>
        ))}
      </ul>
    </div>
  );
}