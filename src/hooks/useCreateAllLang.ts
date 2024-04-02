import { useEffect } from 'react';

// API
import { createAllLang } from 'apis/lang';

// Type
import { FetchLangKey } from 'types/lang';

const useCreateAllLang = () => {
  useEffect(() => {
    const fetch = async () => {
      const types: FetchLangKey[] = ['ability', 'type', 'name'];

      for await (const type of types) {
        setTimeout(() => {
          createAllLang(type);
        }, 5000);
      }
    };

    // fetch();
  }, []);
};

export default useCreateAllLang;
