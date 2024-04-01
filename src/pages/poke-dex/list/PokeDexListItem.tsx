import { PokemonList } from 'types';

// Style
import { PokeDexListItemImg, PokeDexListItemName, PokeDexListItemWrapper } from 'styles/pokeDexList';

// Util
import { createPokemonImgPath } from 'utils/createPokemonImgPath';
import { getPokemonNumFromUrl } from 'utils/getPokemonNumFromUrl';
import { PAGE_URL } from 'consts/common';

interface IPokemonCard {
  pokemonInfo: PokemonList['results'][number];
  triggerIncreaseShowCntRef?: React.RefObject<HTMLAnchorElement>;
}
const PokeDexListItem = ({ pokemonInfo, triggerIncreaseShowCntRef }: IPokemonCard) => {
  const pokemonNum = getPokemonNumFromUrl(pokemonInfo.url);

  return (
    <PokeDexListItemWrapper to={`${PAGE_URL.POKE_DEX}/${pokemonNum}`} ref={triggerIncreaseShowCntRef}>
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
