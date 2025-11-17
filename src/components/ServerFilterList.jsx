import {useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ServerFilterList() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate(`/tasks?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="me-2"
            style={{ maxWidth: "220px" }}
        />
    );
}