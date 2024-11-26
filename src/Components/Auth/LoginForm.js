import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthService from '../../Services/AuthService'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ triggerAlert, onLogin }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await AuthService.login(email, password);
            if (userData) {
                onLogin(); 
                navigate('/dashboard');
            }
        } catch (error) {
            triggerAlert('Invalid email or password.'); 
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
                <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="mb-3"
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="mb-3"
                />
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    type="submit"
                    style={{ 
                        backgroundColor: '#f0a42c', 
                        borderColor: '#f0a42c', 
                        color: 'black',
                        padding: '10px 20px' 
                    }}
                >
                    Login
                </Button>
            </div>

        </Form>
    );
};

export default LoginForm;
