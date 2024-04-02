import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const HomeContainer = styled.div`
  ${(props) => props.theme.size.vFull}
  ${(props) => props.theme.sort.centerColumn}
`;

export const MenuNav = styled(Link)`
  ${(props) => props.theme.sort.centerColumn}
  padding: 20px;
  width: 200px;
  height: 50px;
  border-radius: 6.25vw;
  background-color: #ffc9c9;
  font-size: 4.7222vw;
  font-weight: bold;
  color: rgb(255, 255, 255);
`;
