import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services';
import { QueryKeys, TOKEN_MANAGEMENT } from '@/utils';
import { IUser } from '@/types';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState<IUser>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const access_token = localStorage.getItem(TOKEN_MANAGEMENT.ACCESS_TOKEN) || '';

    if (access_token) {
      setAccessToken(access_token)
    }
    setLoading(false)
  }, [])

  const { data }: { data: any } = useQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: () => userService.getProfile(),
    enabled: !!accessToken,
  });


  useEffect(() => {
    if (!!data) {
      setUser(data);
    }

  }, [!!data]);


  const logout = () => {
    console.log('logged out')
    setUser(null);
    setAccessToken('');
    localStorage.removeItem(TOKEN_MANAGEMENT.ACCESS_TOKEN);
    router.push('/login');
  };


  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
