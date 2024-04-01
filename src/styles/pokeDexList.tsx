import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import Form from 'components/Form';

export const PokeDexListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

export const PokeDexListTitle = styled.h2`
  text-align: center;
`;

export const PokeDexListSearchBox = styled(Form)`
  display: flex;
  align-items: center;
`;

export const PokeDexListSearchInputLabel = styled.label`
  margin-left: 20px;
  ${(props) => props.theme.fontSize.default}
  font-weight: 700;
`;

export const PokeDexListSearchInput = styled.input`
  padding-left: 10px;
  margin-left: 20px;
  width: 200px;
  height: 36px;
  ${(props) => props.theme.fontSize.default}
  font-weight: 400;
`;

export const PokeDexListSearchButton = styled.button`
  ${(props) => props.theme.sort.center}
  margin-left: -1px;
  padding: 20px;
  ${(props) => props.theme.border.radius}
  width: 100px;
  height: 30px;
  border-color: ${(props) => props.theme.color.blue};
  background-color: ${(props) => props.theme.color.blue};
  color: ${(props) => props.theme.color.white};

  &:hover {
    border-color: #e95e5e;
    background-color: #e95e5e;
    color: ${(props) => props.theme.color.black};
  }
`;

export const PokeDexListWrapper = styled.div`
  ${(props) => props.theme.sort.flexWrap}
`;

export const PokeDexListItemWrapper = styled(Link)`
  ${(props) => props.theme.sort.centerColumn}
  padding: 20px;
  margin: 20px;
  margin-bottom: 0px;
  ${(props) => props.theme.border.default}
  color: ${(props) => props.theme.color.black};

  &:hover {
    border-color: ${(props) => props.theme.color.red};
    color: ${(props) => props.theme.color.blue};
  }
`;

export const PokeDexListItemImg = styled.img`
  width: 8vw;
  height: 8vw;
`;

export const PokeDexListItemName = styled.span`
  ${(props) => props.theme.fontSize.default}
  ${(props) => props.theme.sort.textCenter}
`;

export const PokeDexListNone = styled.span`
  ${(props) => props.theme.sort.center}
  ${(props) => props.theme.size.vFull}
  height: 600px;
  font-size: 24px;
  font-weight: 700;
`;

export const PokeDexDetailContainer = styled.div`
  ${(props) => props.theme.sort.centerColumn}
`;
