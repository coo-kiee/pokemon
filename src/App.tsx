import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Const
import { PAGE_URL } from 'consts/common';

// Style
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

// Hook
import useCreateAllLang from 'hooks/useCreateAllLang';
import useSettingLang from 'hooks/useSettingLang';

// Component
import Spinner from 'components/Spinner';
import Layout from 'components/Layout';

const Home = lazy(() => import('pages/home'));
const PokeDex = lazy(() => import('pages/poke-dex'));

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
        <Route path={PAGE_URL.POKE_DEX} element={<PokeDex />} />
        <Route path={`${PAGE_URL.POKE_DEX}/:id`} element={<PokeDex />} />
      </Route>,
    ),
  );

  useCreateAllLang();

  useSettingLang();

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
