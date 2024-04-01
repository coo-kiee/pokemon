export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: Array<{
    ability: { name: string; url: string };
  }>;
  types: Array<{
    type: { name: string; url: string };
  }>;
};

export type Species = {
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
