import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  margin: 5vh;
  margin-left: 2rem;

  background-color: ${props => props.theme.palette.primary.background};
  padding: 2rem;
  border-radius: 1rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1rem 0;
`;

export const CardTitle = styled.h1`
  color: ${props => props.theme.palette.common.white};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CardContentText = styled.h3`
  color: ${props => props.theme.palette.common.white};
  font-size: 1rem;
  margin-left: 0.5rem;
`;