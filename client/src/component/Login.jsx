import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container,  Card } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const reponse = await fetch('http://localhost:3000/api/auth/Login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })
            if(reponse.ok){
                const data = await reponse.json();
                const token = data.token
                const refleshToken = data.refleshToken
                localStorage.setItem('token', token);
                localStorage.setItem('RefleshTokentoken', refleshToken);
                setTimeout(()=>{
                    Navigate('/Dashboard')
                },2000)
                
               
            }else{
                console.log("erreur")
            }

        }catch(err){
            console.log(err)
        }
    };

    return (
       
       <div  style={{
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
         }}>
            <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ borderRadius: '10px' }}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ borderRadius: '10px' }}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            style={{
                                backgroundColor: '#5cb85c',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '10px',
                                fontSize: '16px',
                            }}
                        >
                            Login
                        </Button>
                    </Form>

                    <div className="text-center mt-4">
                        <p>
                            Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#5cb85c' }}>Register</Link>
                        </p>
                    </div>
                </Card.Body>
            </Card>
          </Container>

        </div>
    );
}

export default Login;
