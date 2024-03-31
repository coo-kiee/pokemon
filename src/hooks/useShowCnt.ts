import { useState, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

const useShowCnt = () => {
  const triggerIncreaseShowCntRef = useRef<HTMLAnchorElement>(null);

  const [showCnt, setShoCnt] = useState(50);

  useIntersectionObserver({
    target: triggerIncreaseShowCntRef,
    callBack: () => setShoCnt((prev) => prev + 50),
  });

  return { showCnt, triggerIncreaseShowCntRef };
};

export default useShowCnt;
