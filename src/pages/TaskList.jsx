import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Supabase
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Fetch error:", error);
      setTasks([]);
    } else {
      setTasks(data || []);
    }

    setLoading(false);
  }

  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;

  // Split the tasks into two columns: left = even, right = odd
  const leftColumn = tasks.filter((_, i) => i % 2 === 0);
  const rightColumn = tasks.filter((_, i) => i % 2 === 1);

  return (
    <>
      <Header />

      <div className="container mt-4">
        <h3 className="text-center">All Tasks</h3>
        <p className="text-muted text-center">
          Manage and view every task you’ve created.
        </p>

        {/* Two evenly sized columns */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              flex: 1,
              maxWidth: "500px",
            }}
          >
            {leftColumn.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
          </div>

          {/* Right Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              flex: 1,
              maxWidth: "500px",
            }}
          >
            {rightColumn.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
