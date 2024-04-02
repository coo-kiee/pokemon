import { Outlet } from 'react-router-dom';
import { LayoutContainer } from 'styles/layout';
import SEO from './seo';

const Layout = () => {
  return (
    <LayoutContainer>
      <SEO />
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;
