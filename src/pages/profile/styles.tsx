import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 0 2rem;

  background-color: ${props => props.theme.palette.primary.background};
  padding: 2rem;
  border-radius: 1rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  width: 60%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
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