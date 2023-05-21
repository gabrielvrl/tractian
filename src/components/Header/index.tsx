import { AuthContext } from '@/contexts/AuthContext';
import { LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useTheme } from 'styled-components';
import * as S from "./styles";

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const authenticatedUser = useContext(AuthContext);

  return(
    <S.Container>
      <S.Title onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Tractian</S.Title>
      <S.LoginContainer onClick={() => router.push('/login')} style={{ cursor: 'pointer' }}>
        {
          authenticatedUser?.user ? (
            <>
              <UserOutlined style={{
                fontSize: '2rem',
                color: theme?.palette.primary.main,
              }} />
              <S.LoginText>{`Seja bem vindo, ${authenticatedUser?.user.username}`}</S.LoginText>
              <LogoutOutlined style={{
                fontSize: '2rem',
                color: theme?.palette.primary.main,
                marginLeft: '1rem',
              }} onClick={() => {
                authenticatedUser?.logout();
                router.push('/login');
              }
              } />
            </>
          ) : (
            <>
              <LoginOutlined style={{
                fontSize: '2rem',
                color: theme?.palette.primary.main,
              }} />
              <S.LoginText>Sign in</S.LoginText>
            </>
          )
        }
      </S.LoginContainer>
    </S.Container>
  )
}

export default Header;