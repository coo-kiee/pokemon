import { useState } from 'react';

// Store
import useLangStore from 'stores/useLangStore';

// Type
import { LangKey } from 'types/lang';

const useLang = () => {
  const lang = useLangStore((state) => state.lang);

  const [convertLang] = useState(() => (type: LangKey, value: string) => {
    return lang[type][value] || value;
  });

  const [convertLangs] = useState(() => (type: LangKey, value: string[]) => {
    return value.map((item) => lang[type][item] || item);
  });

  return { convertLang, convertLangs };
};

export default useLang;
