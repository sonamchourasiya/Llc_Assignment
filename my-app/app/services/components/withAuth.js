import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
