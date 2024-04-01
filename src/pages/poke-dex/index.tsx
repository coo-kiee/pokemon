import { PAGE_URL } from 'consts/common';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Util
import { isNaturalNumber } from 'utils/validation';
import PokeDexDetail from './detail';
import PokeDexList from './list';

const PokeDex = () => {
  const navigate = useNavigate();

  const { id = '' } = useParams();
  const pokemonNum = isNaturalNumber(id) ? Number(id) : 0;

  // Redirect
  useEffect(() => {
    if (!pokemonNum) navigate(PAGE_URL.POKE_DEX, { replace: true });
  }, [pokemonNum, navigate]);

  return pokemonNum > 0 ? <PokeDexDetail pokemonId={pokemonNum} /> : <PokeDexList />;
};

export default PokeDex;
