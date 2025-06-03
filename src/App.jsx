import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeLayout, Landing, Error, SinglePageError, About } from './Pages';
import { loader as LayoutLoader } from './Pages/HomeLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: LayoutLoader(queryClient),
    hydrateFallbackElement: <p>Loading ...</p>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
      },
      {
        path: 'about',
        element: <About />,
        errorElement: <SinglePageError />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
