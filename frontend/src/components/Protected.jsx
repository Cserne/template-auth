import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const Protected = ({ children }) => {
    const {token} = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
        if (!token) {
          navigate('/');
        }
      }, [token])
      
      return (
    <div>{children}</div>
  )
}

export default Protected