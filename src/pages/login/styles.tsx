import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;

  width: 100vw;
  margin-top: 20vh;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  
  width: 100%;
  max-width: 360px;
  background-color: ${props => props.theme.palette.primary.background};
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const InputText = styled.h4`
  color: ${props => props.theme.palette.common.white};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Disclaimer = styled.h3`
  color: ${props => props.theme.palette.common.white};
  margin-top: 1rem;
  font-weight: 400;
  font-size: 0.8rem;

  max-width: 360px;
`;