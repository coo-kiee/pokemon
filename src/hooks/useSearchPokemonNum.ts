import { useRef, useState } from 'react';

const useSearchPokemonNum = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchPokemonNum, setSearchPokemonNum] = useState(0);

  const handleSearchPokemonNum = () => {
    if (!searchInputRef.current) return;

    setSearchPokemonNum(Number(searchInputRef.current.value));
  };

  return { searchInputRef, searchPokemonNum, handleSearchPokemonNum };
};

export default useSearchPokemonNum;
