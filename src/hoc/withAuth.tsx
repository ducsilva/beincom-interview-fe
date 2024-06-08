/* eslint-disable react/display-name */
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, accessToken, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !accessToken) {
        router.push('/login');
      }
    }, [accessToken, loading, router]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;