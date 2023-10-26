import React, { useState } from 'react';
import AuthForm from '../Auth/AuthForm';

function Auth() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    const base64Credentials = btoa(`${username}:${password}`);
    const response = await fetch('/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      console.error('Authentication failed');
    }
  };

  return (
    <div className='Auth'>
      {user ? (
        <div>
          <p>welcome, { user.username }!</p>
          <p>Password: { user.password }</p>
        </div>
      ) : (
        <AuthForm onLogin={ handleLogin } />
      )}
    </div>
  );
}

export default Auth;