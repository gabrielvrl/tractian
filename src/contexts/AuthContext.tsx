// contexts/AuthContext.tsx
import { api } from '@/api';
import React, { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react';

export interface User {
  companyId: number,
  email: string,
  id: number,
  name: string,
  unitId: number
}

interface AuthContextProps {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Recuperar o usuário do Local Storage ao inicializar o contexto
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    try {
      const { data } = await api.get('/users');
  
      const userExists = data.filter((user: User) => user.email === email);
      const userLogged = userExists[0];
      if (userLogged) {
        setUser(userLogged);
      } else {
        console.log('Usuário não encontrado na lista de usuários.');
      }
    } catch (error) {
      console.error('Erro ao obter lista de usuários:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Armazenar o usuário no Local Storage sempre que ele for atualizado
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Aqui você pode adicionar as funções de login, logout, etc.

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
