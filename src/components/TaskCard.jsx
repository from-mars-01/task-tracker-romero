// src/components/TaskCard.jsx
import { Card, Button } from "react-bootstrap";
import supabase from "../lib/supabase";
import PropTypes from "prop-types";

export default function TaskCard({ task, onUpdate }) {
  const toggleCompleted = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) console.error("❌ Error updating task:", error);
    else if (onUpdate) onUpdate(); // parent refresh
  };

  return (
    <Card
      className={`shadow-sm ${task.completed ? "border-success bg-light" : ""}`}
      style={{ width: "100%", minHeight: 180, borderWidth: 2 }}
    >
      <Card.Body>
        <Card.Title className="fw-bold mb-2 text-truncate">
          {task.title || "Untitled Task"}
        </Card.Title>

        <Card.Text
          className="text-muted"
          style={{
            fontSize: "0.95rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {task.description || "No details provided."}
        </Card.Text>

        <div className="mt-3 d-flex justify-content-end">
          <Button
            size="sm"
            variant={task.completed ? "outline-success" : "outline-primary"}
            onClick={toggleCompleted}
          >
            {task.completed ? "Completed" : "Mark as Completed"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};
