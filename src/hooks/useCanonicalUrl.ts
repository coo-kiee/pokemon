import { useParams, useLocation } from 'react-router-dom';

// Type
import { HOST_NAME, PageUrl } from 'consts/common';

const useCanonicalUrl = () => {
  const params = useParams();
  const { pathname } = useLocation();

  const urlParams = Object.values(params);
  const paths = pathname.split('/').filter((path) => !urlParams.includes(path));

  const protocal = 'https://';
  const route = paths.join('/') as PageUrl[keyof PageUrl];
  const canonicalUrl = `${protocal}${HOST_NAME}${route}`;

  return { canonicalUrl, route };
};

export default useCanonicalUrl;
