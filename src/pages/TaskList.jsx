import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../lib/supabase";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import useAuth from "../hooks/useAuth";

export default function TaskList() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  // Fetch tasks from Supabase
  useEffect(() => {
    if (!authLoading && user)
      fetchTasks(user.id, searchTerm);
  }, [authLoading, user, searchTerm]);

  async function fetchTasks(userId, searchTerm) {
    setLoading(true);
    let query = supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    query = query.order("id", { ascending: true });

    const { data, error } = await query;

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
        {searchTerm && (
          <p className="text-center">
            Showing results for "<strong>{searchTerm}</strong>"
          </p>
        )}

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
              <TaskCard key={task.id} task={task} onUpdate={() => fetchTasks(user.id, searchTerm)} />
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
              <TaskCard key={task.id} task={task} onUpdate={() => fetchTasks(user.id, searchTerm)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
