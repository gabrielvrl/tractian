import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 10vh;
  
  background-color: ${props => props.theme.palette.common.black};
`;

export const Title = styled.h1`
  color: ${props => props.theme.palette.common.white};
  font-size: 2rem;
  margin-left: 2rem;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  margin-right: 3rem;
`;

export const LoginText = styled.h1`
  color: ${props => props.theme.palette.common.white};
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;
