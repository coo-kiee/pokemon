import { useRef, useState } from 'react';

// Style
import { PokeDexListContainer } from 'styles/poke-dex';

// API
import { useGetPokemonList } from 'apis/poke-dex';

// Hook
import useIntersectionObserver from 'hooks/useIntersectionObserver';

// Component
import PokeDexListItem from './PokeDexListItem';

const PokeDexList = () => {
  const [showCnt, setShoCnt] = useState(50);
  const triggerIncreaseShowCntRef = useRef<HTMLAnchorElement>(null);

  // Fetch
  const { data: pokemonList } = useGetPokemonList();

  useIntersectionObserver({
    target: triggerIncreaseShowCntRef,
    callBack: () => setShoCnt((prev) => prev + 50),
  });

  return (
    <PokeDexListContainer>
      {pokemonList?.results
        .filter((_, index) => index < showCnt)
        .map((item, index) => (
          <PokeDexListItem
            key={item.name}
            pokemonInfo={item}
            triggerIncreaseShowCntRef={
              index + 1 === showCnt ? triggerIncreaseShowCntRef : undefined
            }
          />
        ))}
    </PokeDexListContainer>
  );
};

export default PokeDexList;
