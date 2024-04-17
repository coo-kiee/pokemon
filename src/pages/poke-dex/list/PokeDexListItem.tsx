// Style
import { PokeDexListItemImg, PokeDexListItemName, PokeDexListItemWrapper } from 'styles/pokeDexList';

// URL
import { PAGE_URL } from 'consts/common';

interface IPokeDexListItem<T> {
  pokemon: T;
  fetchTriggerRef?: React.RefObject<HTMLAnchorElement>;
}
const PokeDexListItem = <T extends { name: string; url: string; img: string; id: number }>({
  pokemon,
  fetchTriggerRef,
}: IPokeDexListItem<T>) => {
  return (
    <PokeDexListItemWrapper to={`${PAGE_URL.POKE_DEX}/${pokemon.id}`} ref={fetchTriggerRef}>
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
