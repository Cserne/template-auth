import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { register, user } = useAuth();

    useEffect(() => {
        if(user.userId) navigate('/profile')
    }, [user])

    // const register = async () => {
    //     const response = post('/user/create', { username })
    //     setUsername('');
    //     navigate('/profile');
    // };

    // const triggerRegister = async () => {
    //     await register(username);
    //     // navigate('/profile');
    // }

  return (
    <div>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button onClick={() => register(username)}>Register</button>
    </div>
  )
}

export default Register