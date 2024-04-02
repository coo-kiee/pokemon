import { DependencyList, useEffect } from 'react';

interface IUseIntersectionObserver {
  target: React.RefObject<Element>;
  callBack: () => void;
  options?: {
    readonly root?: Element | Document | null;
    readonly rootMargin?: string;
    readonly thresholds: ReadonlyArray<number>;
  };
  deps?: DependencyList;
}

const useIntersectionObserver = ({
  target,
  callBack,
  options = {
    thresholds: [0.1],
  },
  deps,
}: IUseIntersectionObserver) => {
  useEffect(() => {
    const element = target.current;

    if (!element) return undefined;

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        callBack();
      });
    }, options);

    intersectionObserver.observe(target.current);

    return () => {
      intersectionObserver.unobserve(element);
    };
  }, [callBack, options, target, deps]);
};

export default useIntersectionObserver;
