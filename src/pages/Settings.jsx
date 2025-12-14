import {Container, Card, Form, Badge} from "react-bootstrap";
import Header from "../components/Header";

export default function Settings({theme, setTheme }) {
    return (
        <Container className="my-4">
            <Header />
            <Card>
                <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <Form.Switch
                        id="dark-mode"
                        label="Dark Mode"
                        checked={theme === "dark"}
                        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}