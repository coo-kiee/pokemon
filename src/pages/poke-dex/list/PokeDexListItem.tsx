import { PokeDexList } from 'types';

// Style
import { PokeDexListItemImg, PokeDexListItemName, PokeDexListItemWrapper } from 'styles/pokeDexList';

// URL
import { PAGE_URL } from 'consts/common';

interface IPokemonCard {
  pokemon: PokeDexList[number];
  listItemRef?: React.RefObject<HTMLAnchorElement>;
}
const PokeDexListItem = ({ pokemon, listItemRef }: IPokemonCard) => {
  return (
    <PokeDexListItemWrapper to={`${PAGE_URL.POKE_DEX}/${pokemon.id}`} ref={listItemRef}>
      <PokeDexListItemImg src={pokemon.img} alt={pokemon.name} />
      <PokeDexListItemName>
        No.{pokemon.id}
        <br />
        {pokemon.name}
      </PokeDexListItemName>
    </PokeDexListItemWrapper>
  );
};

export default PokeDexListItem;
