export type ListResult = {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type PokeDexList = Array<ListResult['results'][number] & { img: string }>;

export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: Array<{
    ability: { name: string; url: string };
  }>;
  types: Array<{
    type: { name: string; url: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string; url: string };
  }>;
  moves: Array<{
    move: { name: string; url: string };
  }>;
};

export type Species = {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: {
      name: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
};

type Chain = {
  evolution_details: {
    item: string;
    trigger: {
      name: string;
      url: string;
    };
    held_item: string;
  };
  evolves_to: Array<Chain>;
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
};

export type EvolutionChain = {
  id: number;
  baby_trigger_item: string;
  chain: Chain;
};
