import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const PokeDexListContainer = styled.div`
  ${(props) => props.theme.sort.flexWrap}
  padding: 50px;
`;

export const PokeDexListItemWrapper = styled(Link)`
  ${(props) => props.theme.sort.centerColumn}
  ${(props) => props.theme.border.default}
  color: ${(props) => props.theme.color.black};

  margin: 20px;

  &:hover {
    border-color: ${(props) => props.theme.color.red};
    color: ${(props) => props.theme.color.red};
  }
`;

export const PokeDexListItemImg = styled.img`
  width: 7vw;
  height: 7vw;
`;

export const PokeDexListItemName = styled.span`
  ${(props) => props.theme.fontSize.default}
  ${(props) => props.theme.sort.textCenter}
`;
