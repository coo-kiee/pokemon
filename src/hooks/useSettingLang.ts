import { useEffect } from 'react';

// Store
import useLangStore from 'stores/useLangStore';

// Lang
import ko from 'lang/ko.json';

const useSettingLang = () => {
  const updateLang = useLangStore((state) => state.updateLang);

  useEffect(() => {
    updateLang(ko);
  }, [updateLang]);
};

export default useSettingLang;
