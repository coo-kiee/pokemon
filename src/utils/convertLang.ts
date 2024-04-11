import { Names } from 'types';

export const convertLang = <T extends { name: string; names: Names }>(obj: T, lang: string) => {
  return obj.names.find((item) => item.language.name === lang)?.name || obj.name;
};
