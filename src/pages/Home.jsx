import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import TestButton from "../components/TestButton";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
    // fetchTask(); // Add this line if you implement fetchTask function
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) console.error("Fetch error:", error);
    else setTasks(data);

    // Initialize completedTasks state
    const completedState = {};
    data.forEach((task) => {
      completedState[task.id] = task.completed;
    });
    setCompletedTasks(completedState);
  }

  // No longer needed since we have NewTask page
  // async function addTask() {
  //   if (!task) return;
  //   const { data, error } = await supabase.from("tasks").insert([{ content: task }]);
  //   if (error) console.error("Insert error:", error);
  //   else {
  //     setTask("");
  //     fetchTasks(); // Refresh the list
  //   }
  // }

  async function markAsCompleted(id, currentStatus) {
  const newStatus = !currentStatus;

  // Update local state right away
  setCompletedTasks((prev) => ({ ...prev, [id]: newStatus }));

  // Save to Supabase
  const { error } = await supabase
    .from("tasks")
    .update({ completed: newStatus })
    .eq("id", id);

  if (error) {
    console.error("❌ Update error:", error);
  } else {
    console.log(`✅ Task ${id} updated to ${newStatus}`);
  }
}

  return (

    <Container className="container mt-4">
      <Header />
      <h3>List of tasks</h3>
      {/*No longer needed since we have NewTask page
       <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter a new task"
      /> */}
      {/* No longer needed since we have NewTask page
      <button className="btn btn-primary mb-3" onClick={addTask}>
        Add Task
      </button> */}

      <ul className="list-group">
        {tasks.map((t) => (
          <li 
            key={t.id} 
            className={`list-group-item ${
              completedTasks[t.id] ? "bg-light" : ""
              }`}>
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={!!completedTasks[t.id]}
                onChange={() => markAsCompleted(t.id, completedTasks[t.id])}
              />
              <span 
                className={`ms-2 ${
                  completedTasks[t.id]
                    ? "red-strike": ""
                }`}
                style={{ 
                  fontWeight: completedTasks[t.id] ? "500" : "400" }}>
                {t.content}
              </span>
          </li>
        ))}
      </ul>

      <div className="text-center mt-5">
      <TestButton />
    </div>
    </Container>
  );
}