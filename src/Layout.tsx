import { useState } from 'react';
import './App.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { SheetContent, SheetHeader, SheetTitle, Sheet } from './components/ui/sheet';
import { Toaster } from './components/ui/sonner';
import classNames from 'classnames';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div className="fixed z-[50] w-full bg-glass/30 shadow-default backdrop-blur-md flex justify-between px-3 py-2 h-12">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <HamburgerMenuIcon className="w-7 h-full" onClick={() => setMenuOpen(true)} />
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-1 mt-8">
            <Link
              className={classNames('rounded-md p-3', {
                'bg-glass/20': location.pathname === '/',
              })}
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Homepage
            </Link>
            <Link
              className={classNames('rounded-md p-3', {
                'bg-glass/20': location.pathname === '/exchange',
              })}
              to="/exchange"
              onClick={() => setMenuOpen(false)}
            >
              Exchange
            </Link>
            <Link
              className={classNames('rounded-md p-3', {
                'bg-glass/20': location.pathname === '/open-positions',
              })}
              to="/open-positions"
              onClick={() => setMenuOpen(false)}
            >
              Open Positions
            </Link>
            <Link
              className={classNames('rounded-md p-3', {
                'bg-glass/20': location.pathname === '/closed-positions',
              })}
              to="/closed-positions"
              onClick={() => setMenuOpen(false)}
            >
              Closed Positions
            </Link>
            <Link
              className={classNames('rounded-md p-3', {
                'bg-glass/20': location.pathname === '/pool',
              })}
              to="/pool"
              onClick={() => setMenuOpen(false)}
            >
              Pool
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <w3m-button />
    </div>
  );
};

export const Layout = () => {
  return (
    <div className="tracking-widest h-full bg-[url('/background.png')] bg-center bg-cover relative">
      <Header />
      <div className="absolute top-12 w-full">
        <Outlet />
        <Toaster position="top-center" />
      </div>
    </div>
  );
};
