import { ClosedPositionList } from './components/ClosedPositionList';
import { OpenPositionList } from './components/OpenPositionList';
import { Exchange } from './views/Exchange';
import { GetStartedPage } from './views/GetStartedPage';
import { LandingPage } from './views/LandingPage';
import { Pool } from './views/Pool';

export const routes = [
  {
    title: 'Home',
    href: '/',
    layout: '<PlainLayout />',
    element: LandingPage,
  },
  {
    title: 'Getting Started',
    href: '/get-started',
    layout: '<Layout />',
    element: GetStartedPage,
  },
  {
    title: 'Exchange',
    href: '/exchange',
    layout: '<Layout />',
    element: Exchange,
  },
  {
    title: 'Open Positions',
    href: '/open-positions',
    layout: '<Layout />',
    element: OpenPositionList,
  },
  {
    title: 'Closed Positions',
    href: '/closed-positions',
    layout: '<Layout />',
    element: ClosedPositionList,
  },
  {
    title: 'Pool',
    href: '/pool',
    layout: '<Layout />',
    element: Pool,
  },
];
