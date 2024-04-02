import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

const initialShowCnt = 50;

export const ShowCntContext = createContext(initialShowCnt);
export const SetShowCntContext = createContext<Dispatch<SetStateAction<number>>>(() => 0);

interface IShowCntProvider extends PropsWithChildren {}
const ShowCntProvider = ({ children }: IShowCntProvider) => {
  const [showCnt, setShowCnt] = useState(initialShowCnt);
  return (
    <ShowCntContext.Provider value={showCnt}>
      <SetShowCntContext.Provider value={setShowCnt}>{children}</SetShowCntContext.Provider>
    </ShowCntContext.Provider>
  );
};

export default ShowCntProvider;
