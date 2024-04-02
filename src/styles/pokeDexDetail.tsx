import { styled } from 'styled-components';
import { PokeDexListSearchButton } from './pokeDexList';

export const PokeDexDetailContainer = styled.div`
  ${(props) => props.theme.sort.centerColumn}
`;

export const PokeDexDetailImg = styled.img`
  width: 400px;
  height: 400px;
`;

export const PokeDetailTextBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  ${(props) => props.theme.border.default}
`;

export const PokeDexDetailLabel = styled.label`
  width: 200px;

  font-size: 24px;
  font-weight: 700;
  ${(props) => props.theme.sort.textCenter}
`;

export const PokeDexDetailText = styled.span`
  padding-left: 20px;
  width: 400px;
  font-size: 24px;
  font-weight: 400;
  ${(props) => props.theme.sort.textCenter}
`;

export const PokeDexDetailFunctionBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  margin-left: -40px;
  width: 600px;

  a {
    color: ${(props) => props.theme.color.white};
    &:hover {
      border-color: #e95e5e;
      background-color: #e95e5e;
      color: ${(props) => props.theme.color.black};
    }
  }
`;

export const PokeDexDetailListBtn = styled(PokeDexListSearchButton)``;
