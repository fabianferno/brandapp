import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

const UserDataContext = createContext(null);

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      axios
        .get('/api/users', {
          params: {
            email: user.email
          }
        })
        .then(function (response) {
          setUserData(response.data);
        })
        .catch(function (error) {
          setUserData({});
          console.log(error);
        });
    } else {
      setUserData({});
      console.log('no user');
    }

    return () => {
      setUserData({});
    };
  }, [isLoading]);

  return !isLoading && <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
}
