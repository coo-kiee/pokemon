// Style
import * as S from 'styles/pokeDexDetail';

interface IPokeDexDetailDescription {
  title: string;
  text: string;
}
const PokeDexDetailDescription = ({ title, text }: IPokeDexDetailDescription) => {
  return (
    <S.PokeDetailTextBox>
      <S.PokeDexDetailLabel>{title}</S.PokeDexDetailLabel>
      <S.PokeDexDetailText>{text}</S.PokeDexDetailText>
    </S.PokeDetailTextBox>
  );
};

export default PokeDexDetailDescription;
