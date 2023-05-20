import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  
  background-color: ${props => props.theme.colors.background};
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: 2rem;
  margin: 2rem;
`;
