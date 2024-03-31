import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Const
import { PAGE_URL } from 'consts/common';
import Spinner from 'pages/common/Spinner';

// Style
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

// Component
import Layout from 'pages/common/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokeDexDetail from 'pages/poke-dex/detail';

const Home = lazy(() => import('pages/home'));
const PokeDexList = lazy(() => import('pages/poke-dex/list'));

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path={PAGE_URL.HOEM} element={<Home />} />,
        <Route path={PAGE_URL.POKE_DEX} element={<PokeDexList />} />
        <Route path={`${PAGE_URL.POKE_DEX}/:id`} element={<PokeDexDetail />} />
      </Route>,
    ),
  );

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
