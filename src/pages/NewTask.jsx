import { useState } from "react";
import supabase from "../lib/supabase";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function addTask() {
    if (!title || !description) return alert("Please enter both the task title and description");
    setLoading(true);

    const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description }])
    .select();

    setLoading(false);

    if (error) {
      console.error("Insert error:", error);
      alert("Error adding task");
    } else {
      const newData = data[0];
      alert("Task added!");
      navigate("/"); // ✅ send the user back to the home page
    }
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <p className="text-muted">Create a new task below.</p>

        {/* TaskCard Preview */}
        <TaskCard
          task={{ title: title || "Untitled Task", description }}
          isExpanded={true}
        />

        {/* Form Inputs */}
        <div className="card mt-3 shadow-sm p-3">
          <div className="mb-3">
            <label className="form-label fw-bold">Task Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

        <button
          className="btn btn-success"
          onClick={addTask}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Task"}
        </button>
      </div>
    </div>
    </>
  );
}