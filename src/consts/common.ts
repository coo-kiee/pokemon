// 임시
export const HOST_NAME = 'www.pokeapi.com';

export const API_URL = {
  BASE: 'https://pokeapi.co/api/v2',
  POKEMON: '/pokemon',
  SPECIES: '/pokemon-species',
};

export const PAGE_URL = {
  HOEM: '/',
  POKE_DEX: '/pokeDex',
} as const;
export type PageUrl = typeof PAGE_URL;

export type Seo = Record<PageUrl[keyof PageUrl], string>;

export const PAGE_TITLE: Seo = {
  [PAGE_URL.HOEM]: '포켓몬스터',
  [PAGE_URL.POKE_DEX]: '도감',
} as const;

export const PAGE_DESCRIPTION: Seo = {
  [PAGE_URL.HOEM]: '포켓몬스터를 좋아하는 사람들에게 정보를 제공하기 위한 사이트',
  [PAGE_URL.POKE_DEX]: '1300여가지의 포켓몬 도감 정보',
};
