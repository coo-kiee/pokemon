import { useRef, useContext } from 'react';

// Context
import { SetShowCntContext } from 'pages/poke-dex/ShowCntProvider';

// Hook
import useIntersectionObserver from './useIntersectionObserver';

const useShowCnt = () => {
  const triggerIncreaseShowCntRef = useRef<HTMLAnchorElement>(null);

  const setShowCnt = useContext(SetShowCntContext);

  useIntersectionObserver({
    target: triggerIncreaseShowCntRef,
    callBack: () => setShowCnt((prev) => prev + 50),
  });

  return { triggerIncreaseShowCntRef };
};

export default useShowCnt;
