import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { getUserInfo } from '../services/api';
import withAuth from '../components/withAuth';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setUser(response.data);
    } catch (error) {
      Cookies.remove('token');
      router.push('/login');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => {
        Cookies.remove('token');
        router.push('/login');
      }}>Logout</button>
    </div>
  );
};

export default withAuth(HomePage);
