import {useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import supabase from "../lib/supabase";

export default function PasswordReset() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const { error } = await supabase.auth.updateUser({
            password: password
        });

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            setMessage("Password updated successfully!");
            window.location.href = "/login";
        }
        
    };  

    return (
        <Card className="mx-auto mt-5" style={{ maxWidth: "400px" }}>
            <Card.Body>
                <Card.Title className="mb-4">Reset Your Password</Card.Title>
                <Form onSubmit={handleUpdatePassword}>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}