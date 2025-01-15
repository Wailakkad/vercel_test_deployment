import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageValidation, setMessage] = useState(""); 

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/Register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname: fullname,
                    email: email,
                    password: password
                })
            });
            if (response.ok) { 
                const data = await response.json();
                if (data.body && data.body._id) { 
                    setMessage("Registration Successful");
                    setTimeout(() => {
                        window.location.href = '/Login';
                    }, 3000);
                } else {
                    setMessage("Registration failed. Please try again.");
                }
            } else {
                setMessage("Error: Unable to register. Please check your inputs.");
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            setMessage("Error: Something went wrong. Please try again later.");
            console.error("Error during registration:", err);
        } finally {
            // Clear inputs only if registration was successful
            if (!messageValidation.includes("Error")) {
                setFullname('');
                setEmail('');
                setPassword('');
            }
            console.log("Request completed.");
        }
    };

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Container className="d-flex justify-content-center align-items-center">
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '20px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                        overflow: 'hidden',
                    }}
                >
                    {messageValidation ? (
                        <Alert
                            variant={messageValidation.includes("Error") ? "danger" : "success"}
                            className="text-center"
                        >
                            {messageValidation}
                        </Alert>
                    ) : (
                        <div className="text-center">
                            .....
                        </div>
                    )}
                    <Card.Body>
                        <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: '700' }}>
                            Register
                        </h2>
                        <Form onSubmit={HandleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label style={{ fontWeight: '500', color: '#555' }}>Full Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter Full Name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label style={{ fontWeight: '500', color: '#555' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label style={{ fontWeight: '500', color: '#555' }}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                                    }}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                className="w-100"
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontWeight: '600',
                                    padding: '10px 15px',
                                    transition: 'all 0.3s ease-in-out',
                                }}
                                onMouseOver={(e) => (e.target.style.transform = 'scale(1.01)')}
                                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                Register
                            </Button>
                        </Form>
                        <p className="text-center mt-4" style={{ color: '#555' }}>
                            Already have an account?{' '}
                            <Link
                                to="/Login"
                                style={{
                                    textDecoration: 'none',
                                    color: '#667eea',
                                    fontWeight: '600',
                                }}
                            >
                                Login
                            </Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Register;
