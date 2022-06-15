import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Callback = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loginWithCode = async() => {

            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (code) {
                await login(code, "google");
            }
            navigate('/')
        }
        loginWithCode();
    }, [])
    
  return (
    <div>

    </div>
  )
}

export default Callback