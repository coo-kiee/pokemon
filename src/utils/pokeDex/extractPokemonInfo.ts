type PokemonInfo = Array<{
  [key: string]: { name: string; url: string };
}>;
export const extractPokemonInfo = <T extends PokemonInfo>(info: T, key: keyof T[number]) => {
  const names = info.map((item) => item[key as keyof typeof item].name);

  return names;
};
