import { Pokemon } from 'types';
// type PokemonInfo = Omit<Pokemon, 'id' | 'name' | 'weight' | 'sprites' >;

type PokemonInfo = Array<{
  [key: string]: { name: string; url: string };
}>;
export const extractPokemonInfo = <T extends PokemonInfo>(info: T, key: keyof T[number]) => {
  const names = info.map((item) => item[key as keyof typeof item].name);

  return names;
};

export const extractPokemonStat = (info: Pokemon['stats']) => {
  const stats = info.reduce(
    (arr, cur) => {
      arr[0].push(cur.stat.name);
      arr[1].push(cur.base_stat);
      return arr;
    },
    [[], []] as [string[], number[]],
  );

  return stats;
};
