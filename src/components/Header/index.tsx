import { AuthContext } from '@/contexts/AuthContext';
import { LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
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
      <S.Title onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
        Tractian
        <Typography
          style={{
            color: theme?.palette.primary.main,
            marginLeft: '0.5rem',
            fontSize: '2rem',
            fontFamily: 'Inter',
          }}
        >.</Typography>
      </S.Title>

        {
          authenticatedUser?.user ? (
            <S.LoginContainer style={{ cursor: 'pointer' }}>
              <UserOutlined style={{
                fontSize: '1.5rem',
                color: theme?.palette.primary.main,
              }} onClick={() => router.push(`/user-profile/${authenticatedUser.user?.id}`)}  />
              <S.LoginText onClick={() => router.push('/userProfile')}>{`Seja bem vindo, ${authenticatedUser?.user?.name}`}</S.LoginText>
              <LogoutOutlined style={{
                fontSize: '1.5rem',
                color: theme?.palette.primary.main,
                marginLeft: '1rem',
              }} onClick={() => {
                authenticatedUser?.logout();
                router.push('/login');
              }
              } />
            </S.LoginContainer>
          ) : (
            <S.LoginContainer onClick={() => router.push('/login')} style={{ cursor: 'pointer' }}>
              <LoginOutlined style={{
                fontSize: '2rem',
                color: theme?.palette.primary.main,
              }} />
              <S.LoginText>Sign in</S.LoginText>
            </S.LoginContainer>
          )
        }
            
    </S.Container>
  )
}

export default Header;