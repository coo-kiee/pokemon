// Const
import { PAGE_DESCRIPTION, PAGE_TITLE } from 'consts/common';

// Hook
import useCanonicalUrl from 'hooks/useCanonicalUrl';

// Component
import Meta from './Meta';

const Seo = () => {
  const { canonicalUrl, route } = useCanonicalUrl();

  return <Meta canonical={canonicalUrl} title={PAGE_TITLE[route]} description={PAGE_DESCRIPTION[route]} />;
};

export default Seo;
