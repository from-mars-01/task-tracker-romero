import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import Header from '../components/Header';

export default function Signup() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
        setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (!data?.session) {
        setInfo("Signup successful! Please check your email for verification.");
        navigate('/login');
      }
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
        <h2>Create your account</h2>
        <p>Enter your email and password to sign up.</p>

    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder='Create a password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='new-password'
            minLength={6}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder='Re-enter your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete='new-password'
            minLength={6}
          />
        </Form.Group>

        {error && <p className="error">{error}</p>}
        {info && <p className="info">{info}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>
    </Form>
    </div>
    </>
  );
}