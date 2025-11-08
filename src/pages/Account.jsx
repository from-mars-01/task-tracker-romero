import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import supabase from '../lib/supabase';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

export default function Account() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [createdAt, setCreatedAt] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        } else if (user) {
            setCreatedAt(user.created_at || null);
        }
    }, [loading, user, navigate]);

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
            <Header />
            <div className="container mt-4 text-center">
                <h2>Your Account</h2>
                <p>Here is your account info:</p>

                <div className="mt-3 p-4 border rounded shadow-sm">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Account created on:</strong> {createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}</p>
                </div>

                <div className="mt-4">
                    <Button 
                    variant="outline-danger" 
                    onClick={handleLogout} 
                    disabled={loggingOut}>
                        {loggingOut ? <Spinner animation="border" size="sm" /> : 'Logout'}
                    </Button>
                </div>
            </div>
        </>
    );
}
