import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/tasks');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div>
      <h2>Login Page</h2>
      <h3>Welcome back! Please log in to your account.</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-30" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>

      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
    </>
  );
}
