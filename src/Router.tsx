import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ClosedPositionList } from './components/ClosedPositionList';
import { OpenPositionList } from './components/OpenPositionList';
import { Layout } from './layouts/Layout';
import { PlainLayout } from './layouts/PlainLayout';
import { Exchange } from './views/Exchange';
import { GetStartedPage } from './views/GetStartedPage';
import { LandingPage } from './views/LandingPage';
import { Pool } from './views/Pool';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PlainLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="get-started" element={<GetStartedPage />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="open-positions" element={<OpenPositionList />} />
        <Route path="closed-positions" element={<ClosedPositionList />} />
        <Route path="pool" element={<Pool />} />
      </Route>
    </Route>
  )
);
