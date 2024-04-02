import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { PokeDexListSearchButton } from './pokeDexList';

export const PokeDexDetailContainer = styled.div`
  ${(props) => props.theme.size.full}
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
  white-space: pre-line;
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
`;

export const PokeDexDetailListBtn = styled(PokeDexListSearchButton)`
  background-color: #ffc9c9;
  border: 1px solid transparent;

  a {
    color: ${(props) => props.theme.color.white};
  }

  &:hover {
    background-color: #ffc9c9;
    border: 1px solid ${(props) => props.theme.color.blue};

    a {
      color: ${(props) => props.theme.color.blue};
    }
  }
`;

export const PokeDexDetailEvolutionBox = styled.div`
  padding-left: 20px;
  width: 400px;
  font-size: 24px;
  font-weight: 400;
  ${(props) => props.theme.sort.textCenter}
`;
export const PokeDexEvolutionLink = styled(Link)<{ $isCurrent: boolean }>`
  color: ${(props) => (props.$isCurrent ? props.theme.color.red : props.theme.color.black)};

  &:hover {
    color: ${(props) => props.theme.color.blue};
  }
`;
