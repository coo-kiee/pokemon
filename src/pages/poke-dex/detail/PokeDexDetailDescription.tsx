// Style
import { ReactNode } from 'react';
import * as S from 'styles/pokeDexDetail';

interface IPokeDexDetailDescription {
  title: string;
  text?: string;
  render?: () => ReactNode;
}
const PokeDexDetailDescription = ({ title, text, render }: IPokeDexDetailDescription) => {
  return (
    <S.PokeDetailTextBox>
      <S.PokeDexDetailLabel>{title}</S.PokeDexDetailLabel>
      {render ? render() : <S.PokeDexDetailText>{text}</S.PokeDexDetailText>}
    </S.PokeDetailTextBox>
  );
};

export default PokeDexDetailDescription;
