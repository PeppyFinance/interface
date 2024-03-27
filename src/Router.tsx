import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Exchange } from './views/Exchange';
import { Layout } from './Layout';
import { LandingPage } from './views/LandingPage';
import { OpenPositionList } from './components/OpenPositionList';
import { ClosedPositionList } from './components/ClosedPositionList';
import { Pool } from './views/Pool';
import { GetStartedPage } from './views/GetStartedPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/get-started" element={<GetStartedPage />} />
      <Route path="/exchange" element={<Exchange />} />
      <Route path="/open-positions" element={<OpenPositionList />} />
      <Route path="/closed-positions" element={<ClosedPositionList />} />
      <Route path="/pool" element={<Pool />} />
    </Route>
  )
);
