import { useState } from "react";
import supabase from "../lib/supabase";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function NewTask() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function addTask() {
    if (!task) return alert("Please enter a task");
    setLoading(true);

    const { error } = await supabase.from("tasks").insert([{ content: task }]);
    setLoading(false);

    if (error) {
      console.error("Insert error:", error);
      alert("Error adding task");
    } else {
      alert("Task added!");
      navigate("/"); // ✅ send the user back to the home page
    }
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>New Task</h3>
        <p className="text-muted">Create a new task below.</p>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter task description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={addTask}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Task"}
        </button>
      </div>
    </>
  );
}