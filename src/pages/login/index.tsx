import { Button, Form, Input, Space, Typography } from 'antd';
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import * as S from './styles';
import { useTheme } from 'styled-components';
import { useContext, useState } from 'react';
import { AuthContext, User } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  const authenticateUser = useContext(AuthContext);
  console.log(authenticateUser?.user)
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const InputStyle = {
    backgroundColor: theme?.palette.common.black,
    padding: '1rem',
    marginBottom: '1rem',
    color: theme?.palette.primary.background,
    borderColor: theme?.palette.primary.background,
  }

  const InnerInputStyles = {
    input: {
      backgroundColor: theme?.palette.common.black,
      color: theme?.palette.common.white,
    }
  }

  const IconStyle = {
    color: theme?.palette.primary.main,
    backgroundColor: 'transparent',
  }

  const ButtonStyle = {
    height: '3rem',
    alignSelf: 'center',
    backgroundColor: theme?.palette.primary.pink,
    color: theme?.palette.common.white,
    borderColor: theme?.palette.primary.main,
    width: '100%',
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: theme?.palette.primary.darker_pink,
      color: theme?.palette.common.white,
    },
  }

  if(authenticateUser?.user) router.push('/');

  const handleSubmit = () => {
    if (username) {
      authenticateUser?.login(username);
      router.push('/');
    }
  }

  return (
    <S.Container>
      <S.LoginContainer>
        <S.ContentContainer>
          <S.InputText>Usuário</S.InputText>
          <Input 
            size="large" 
            suffix={<UserOutlined 
              style={IconStyle}
            />}
            style={InputStyle}
            inputMode="text"
            styles={InnerInputStyles}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </S.ContentContainer>


        <S.ContentContainer>
          <S.InputText>Senha</S.InputText>
          <Input.Password 
            size="large" 
            style={InputStyle}
            iconRender={visible => (visible ? <EyeOutlined style={IconStyle} /> : <EyeInvisibleOutlined style={IconStyle} />)}
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            styles={InnerInputStyles}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.ContentContainer>

        <Button style={ButtonStyle} onClick={handleSubmit}>Entrar</Button>
      </S.LoginContainer>

      <S.Disclaimer>Entre com os usuários: <strong>"1", "2", "3" ou "4"</strong> e qualquer senha para visualizar dados da API.</S.Disclaimer>
    </S.Container>
  )
}

export default Login;