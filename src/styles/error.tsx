import { styled } from 'styled-components';

export const ErrorContainer = styled.div`
  ${(props) => props.theme.size.vFull}
  ${(props) => props.theme.sort.centerColumn}
`;

export const ErrorText = styled.p`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;
