// contexts/AuthContext.tsx
import React, { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react';

export interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string) => void;
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

  const login = (username: string) => {
    const newUser: User = { username };
    setUser(newUser);
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
