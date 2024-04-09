import { ListResult } from 'types';

// Style
import { PokeDexListItemImg, PokeDexListItemName, PokeDexListItemWrapper } from 'styles/pokeDexList';

// URL
import { PAGE_URL } from 'consts/common';

// Util
import { createPokemonImgPath } from 'utils/pokeDex/createPokemonImgPath';
import { getPokemonNumFromUrl } from 'utils/pokeDex/getPokemonNumFromUrl';

interface IPokemonCard {
  pokemonInfo: ListResult['results'][number];
  listItemRef?: React.RefObject<HTMLAnchorElement>;
}
const PokeDexListItem = ({ pokemonInfo, listItemRef }: IPokemonCard) => {
  const pokemonNum = getPokemonNumFromUrl(pokemonInfo.url);

  return (
    <PokeDexListItemWrapper to={`${PAGE_URL.POKE_DEX}/${pokemonNum}`} ref={listItemRef}>
      <PokeDexListItemImg src={createPokemonImgPath(pokemonNum)} alt={pokemonInfo.name} />
      <PokeDexListItemName>
        No.{pokemonNum}
        <br />
        {pokemonInfo.name}
      </PokeDexListItemName>
    </PokeDexListItemWrapper>
  );
};

export default PokeDexListItem;
