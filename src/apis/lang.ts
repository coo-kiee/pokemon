// Type
import { FetchLangKey, FETCH_LANG_TYPE, LangResult, ExctractName } from 'types/lang';

// Util
import Axios from '../utils/axios';

const getLang = async (type: FetchLangKey, id: number) => {
  const { fetchUrl } = FETCH_LANG_TYPE[type];

  const res = await Axios.get<LangResult>(`${fetchUrl}/${id}/`);

  return res;
};

const getAllLang = async (type: FetchLangKey) => {
  const promises = [];
  const { start, end } = FETCH_LANG_TYPE[type];

  for (let index = start; index <= end; index += 1) {
    promises.push(getLang(type, index));
  }

  const res = await Promise.all(promises);

  return res;
};

const extractNameFromLangData = (langData: LangResult) => {
  const koName = langData.names.find((item) => item.language.name === 'ko');

  const exctractName: ExctractName = {
    [langData.name]: koName?.name || langData.name,
  };

  return exctractName;
};

const createLangJson = async (type: FetchLangKey, exctractName: ExctractName) => {
  const { saveUrl } = FETCH_LANG_TYPE[type];

  fetch(`http://localhost:3001/${saveUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(exctractName),
  });
};

export const createAllLang = async (type: FetchLangKey) => {
  const allLangs = await getAllLang(type);

  const exctractNames = allLangs.map((item) => (item ? extractNameFromLangData(item) : {}));

  const names = exctractNames.reduce((arr, cur) => ({ ...arr, ...cur }), {});

  createLangJson(type, names);
};
