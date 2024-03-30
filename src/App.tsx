import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Const
import { PAGE_URL } from 'consts/common';
import Spinner from 'pages/common/Spinner';

// Style
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

// Component
import Layout from 'pages/common/Layout';

const Home = lazy(() => import('pages/home'));
const PokeDex = lazy(() => import('pages/poke-dex'));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path={PAGE_URL.HOEM} element={<Home />} />,
        <Route path={PAGE_URL.POKE_DEX} element={<PokeDex />}>
          <Route path=":id" element={<div>DETAIL</div>} />
        </Route>
      </Route>,
    ),
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
