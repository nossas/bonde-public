import styled from '@emotion/styled';

type HeaderProps = {
  backgroundColor: string;
};

export const Header = styled.h2<HeaderProps>`
  background-color: ${props => props.backgroundColor};
  font-family: inherit;
  color: #fff;
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0;
  border-radius: 3px 3px 0 0;
  font-weight: 400;
  text-align: center;
`;

export const Container = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  overflow: auto;
`;