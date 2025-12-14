console.log("USING THIS TASKCARD FILE");
// src/components/TaskCard.jsx
import { Card, Button } from "react-bootstrap";
import supabase from "../lib/supabase";
import PropTypes from "prop-types";
import "./TaskCard.css";

export default function TaskCard({ task, onUpdate }) {
  const toggleCompleted = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);
    if (error) console.error("❌ Error updating task:", error);
    else if (onUpdate) onUpdate();
  };

return (
  <Card bg="body" className={`note-card ${task.completed ? "note-card--done" : ""}`}>
    <Card.Body>
      <div className="note-card__header d-flex justify-content-between align-items-center">
        <div
          className="note-card__title flex-grow-1 text-truncate me-3 text-body"
          title={task.title || "Untitled Task"}
        >
          {task.title || "Untitled Task"}
        </div>

        <Button
          size="sm"
          variant={task.completed ? "success" : "outline-success"}
          onClick={toggleCompleted}
          title={task.completed ? "Mark as incomplete" : "Mark as completed"}
        >
          ✓
        </Button>
      </div>

      {/* Red line */}
      <div className="note-card__redLine" />

      {/* Details area sits ON blue lines */}
      <div className="note-card__detailsArea">
        <div className="note-card__paper">
          <div className="note-card__details text-body">
            {task.description || "No details provided."}
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};
