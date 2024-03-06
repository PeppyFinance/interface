import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Exchange } from './views/Exchange';
import { Layout } from './Layout';
import { LandingPage } from './views/LandingPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/exchange" element={<Exchange />} />
    </Route>
  )
);
