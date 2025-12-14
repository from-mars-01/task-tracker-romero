import { useState, useEffect, useMemo} from "react";
import supabase from "../lib/supabase";
import TestButton from "../components/TestButton";
import Header from "../components/Header";
import { Container, Card, Badge } from "react-bootstrap";

export default function Home() {
  const [session, setSession] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Fetch tasks on load
  useEffect(() => {
    if (session?.user) fetchTasks();
    else { 
      setTasks([]);
      setCompletedTasks({});
    }
    // fetchTask(); // Add this line if you implement fetchTask function
  }, [session]);

  async function fetchTasks() {
    setLoading(true);

    const { data, error } = await supabase.from("tasks").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false });
    setLoading(false);
    if (error) { console.error("Fetch error:", error) 
      return;}
    
      setTasks(data);

    // Initialize completedTasks state
    const completedState = {};
    (data || [])  .forEach((task) => {
      completedState[task.id] = task.completed;
    });
    setCompletedTasks(completedState);
  }

  async function markAsCompleted(id, currentStatus) {
  const newStatus = !currentStatus;

  // Update local state right away
  setCompletedTasks((prev) => ({ ...prev, [id]: newStatus }));

  // Save to Supabase
  const { error } = await supabase
    .from("tasks")
    .update({ completed: newStatus })
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Update error:", error);
    setCompletedTasks((prev) => ({ ...prev, [id]: currentStatus }));
  }
}

const isTaskDone = (task) => {
  if (isSignedIn) return !!completedTasks[task.id];
  return !!task.completed;
};

const stats = useMemo(() => {
  const total = tasks.length;
  const completed = tasks.reduce 
  ((acc, t) => acc + (completedTasks[t.id] ? 1 : 0), 
  0
);
  const remaining = total - completed;

 const incompleteTasksWithDates = tasks.filter(
  (t) => t.created_at && !completedTasks[t.id]
);

let oldestLabel = "None 🎉";

if (incompleteTasksWithDates.length > 0) {
  const oldestTask = incompleteTasksWithDates.reduce((oldest, t) => {
    return new Date(t.created_at) < new Date(oldest.created_at) ? t : oldest;
  }, incompleteTasksWithDates[0]);

  oldestLabel = oldestTask.title || "Untitled task";
}

  return { total, completed, remaining, oldestLabel };
}, [tasks, completedTasks]);

const demoTasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Walk the dog", completed: true },
  { id: 3, title: "Read a book", completed: false },
];

const isSignedIn = !!session?.user;

  return (

    <Container className="container mt-4" style={{ maxWidth: "900px" }}>
      <Header />

      {isSignedIn ? (
        <>
          <div className="text-center mb-4">
  <h3 className="mb-1">Your task stats</h3>

  <div className="text-muted mb-3">
    Let's make today a great day and knock some stuff off your to-do list.
  </div>

  <Card className="mx-auto" style={{ maxWidth: 360 }}>
    <Card.Body className="text-center">
      <Card.Title className="mb-2">Stats</Card.Title>
      <div>Total: <strong>{stats.total}</strong></div>
      <div>Completed: <strong>{stats.completed}</strong></div>
      <div>Remaining: <strong>{stats.remaining}</strong></div>
      <div className="mt-2">
        Oldest task: <strong>{stats.oldestLabel}</strong>
      </div>
    </Card.Body>
  </Card>
</div>

          {loading ? (
            <div className="text-muted">Loading tasks…</div>
          ) : (
            <ul className="list-group">
  {tasks.map((t) => {
    const done = isTaskDone(t);

    return (
      <li
  key={t.id}
  className={`list-group-item ${done ? "bg-body-tertiary" : ""} text-body`}
>
        <div className="d-flex justify-content-between align-items-center">
          {/* Centered text block (same as signed-out) */}
          <div className="mx-auto text-center">
            <div className={`${done ? "red-strike" : ""}`} style={{ fontWeight: done ? "500" : "400" }}>
              {t.title}
            </div>
          </div>

          {/* Right-aligned functional checkbox */}
          <span onClick={() => markAsCompleted(t.id, done)}
            style={{ 
              minWidth: "24px", 
              textAlign: "right", 
              color: done ? "green" : "transparent",
              fontWeight: "700", 
              fontSize: "1.2rem", 
              cursor: "pointer",
              userSelect: "none"
             }}
             title={done ? "Mark as incomplete" : "Mark as completed"}
          >
            ✓
          </span>
        </div>
      </li>
    );
  })}
</ul>
          )}
        </>
  ): (
        <>
      <h3>Your go-to task tracker!</h3>
      <p className="text-muted">
        Manage your tasks in one place-add items, track progress, and keep your day on track.
        Sign in to view your personlalized task list.
      </p>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Example Tasks</Card.Title>

<ul className="list-group">
  {demoTasks.map((t) => {
    const done = isTaskDone(t);

    return (
      <li
  key={t.id}
  className={`list-group-item ${done ? "bg-body-tertiary" : ""} text-body`}
>
        <div className="d-flex justify-content-between align-items-center">
          <div className="mx-auto text-center">
            <div className={`${done ? "red-strike" : ""}`}>
              {t.title}
            </div>
            <div className="text-muted small">{t.description}</div>
          </div>

          <span style={{ minWidth: "24px", textAlign: "right", color: done ? "green" : "transparent",
            fontWeight: "700", fontSize: "1.2rem"
           }}>
            ✓
          </span>
        </div>
      </li>
    );
  })}
</ul>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>What you’ll get</Card.Title>
              <ul className="mx-auto" style={{ maxWidth: 400, textAlign: "center" }}>
                <li>Create tasks with a title and details</li>
                <li>Mark tasks completed as you go</li>
                <li>See progress at a glance</li>
              </ul>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
