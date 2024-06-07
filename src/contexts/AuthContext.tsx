import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services';
import { QueryKeys, TOKEN_MANAGEMENT } from '@/utils';
import { IUser } from '@/types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  console.log("🚀 ~ AuthProvider ~ accessToken:", accessToken)
  const [user, setUser] = useState<IUser>(null);

  useEffect(() => {
    const access_token = localStorage.getItem(TOKEN_MANAGEMENT.ACCESS_TOKEN) || ''
    setAccessToken(access_token)

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


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
