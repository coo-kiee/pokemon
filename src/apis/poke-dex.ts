// Util
import Axios from 'utils/axios';

export const getPokemonList = async () => {
  const data = await Axios.get('pokemon');

  return { data };
};
