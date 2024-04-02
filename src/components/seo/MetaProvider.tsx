import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

const MetaProvider = ({ children }: PropsWithChildren) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export default MetaProvider;
