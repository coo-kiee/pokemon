import { useRef, useState } from 'react';

const useSearchPokemonNum = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchPokemonId, setSearchPokemonId] = useState('');

  const handleSearchPokemonId = () => {
    if (!searchInputRef.current) return;

    setSearchPokemonId(searchInputRef.current.value);
  };

  return { searchInputRef, searchPokemonId, handleSearchPokemonId };
};

export default useSearchPokemonNum;
