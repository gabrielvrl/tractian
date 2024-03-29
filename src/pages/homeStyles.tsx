import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 0 2rem;

  background-color: ${props => props.theme.palette.primary.background};
  padding: 2rem;
  border-radius: 1rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  width: 600px;
  margin-bottom: 1rem;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
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

export const MachineImage = styled(Image)`
  border-radius: auto;
`;

export const SeeMore = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`