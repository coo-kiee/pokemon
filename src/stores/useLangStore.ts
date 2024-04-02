import { create } from 'zustand';

// Type
import { LangType } from 'types/lang';

const initialLang: LangType = {
  names: {},
  types: {},
  abilities: {},
};

type State = {
  lang: LangType;
};

type Action = {
  updateLang: (args: LangType) => void;
};
const useLangStore = create<State & Action>((set) => ({
  lang: { ...initialLang },
  updateLang: (args) => set((prev) => ({ lang: { ...prev.lang, ...args } })),
}));

export default useLangStore;
