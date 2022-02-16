import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate()
    const [credential, setCredentials] = useState({ email: '', password: '' })
    const onChange = (e) => {
        setCredentials({ ...credential, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTc0NTFlNTI0MTlhODEyM2E1ZDAxIn0sImlhdCI6MTY0NDE2MjY4OX0.6nV5F8TjC1E0BM5APuKirrC8qRK7BwNARMT-eOxuDmo'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        console.log("Response : ", json)
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/")

        }
        else {
            alert("Invalid credential")
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label for="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credential.email} placeholder="Enter email" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credential.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
