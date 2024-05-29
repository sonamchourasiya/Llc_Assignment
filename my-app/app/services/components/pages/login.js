import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { register, login } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await login(username, password);
      } else {
        response = await register(username, password, email);
      }

      if (isLogin) {
        Cookies.set('token', response.data);
        router.push('/');
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
