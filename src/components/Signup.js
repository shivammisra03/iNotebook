import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate()
    const [signupDetails, setSignUpDetails] = useState({ name: '', email: '', password: '', cpassword: '' })
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: signupDetails.name, email: signupDetails.email, password: signupDetails.password })
        });
        const json = await response.json()
        console.log("Response : ", json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate('/')
        } else {
            alert('Invalid entry')
        }
    }
    const onChange = (e) => {
        setSignUpDetails({ ...signupDetails, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp" placeholder="Enter Name" value={signupDetails.name} onChange={onChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" value={signupDetails.email} onChange={onChange} required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={signupDetails.password} onChange={onChange} minLength={5} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="Confirm Password" onChange={onChange} value={signupDetails.cpassword} minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={signupDetails.password == '' || signupDetails.password != signupDetails.cpassword}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
