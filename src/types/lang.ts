export type LangResult = {
  name: string;
  names: Array<{
    name: string;
    language: {
      name: string;
    };
  }>;
};

export const FETCH_LANG_TYPE = {
  name: {
    fetchUrl: 'pokemon-species',
    saveUrl: 'names',
    start: 1,
    end: 1030,
  },
  type: {
    fetchUrl: 'type',
    saveUrl: 'types',
    start: 1,
    end: 20,
  },
  ability: {
    fetchUrl: 'ability',
    saveUrl: 'abilities',
    start: 1,
    end: 310,
  },
  move: {
    fetchUrl: 'move',
    saveUrl: 'moves',
    start: 1,
    end: 920,
  },
  stats: {
    fetchUrl: 'stat',
    saveUrl: 'stats',
    start: 1,
    end: 10,
  },
} as const;
export type FetchLangKey = keyof typeof FETCH_LANG_TYPE;

export type ExctractName = {
  [id: number]: string;
};

export type LangKey = (typeof FETCH_LANG_TYPE)[FetchLangKey]['saveUrl'];
export type LangType = {
  [key in LangKey]: Record<string, string>;
};
