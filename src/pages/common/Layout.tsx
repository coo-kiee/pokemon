import { Outlet } from 'react-router-dom';
import { LayoutContainer } from 'styles/Layout';

const Layout = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;
