import { useState } from 'react';
import './App.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { SheetContent, SheetHeader, SheetTitle, Sheet } from './components/ui/sheet';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-glass/30 shadow-default backdrop-blur-md flex justify-between px-3 py-2 h-12">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <HamburgerMenuIcon className="w-7 h-full" onClick={() => setMenuOpen(true)} />
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-8 mt-8">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Homepage
            </Link>
            <Link to="/exchange" onClick={() => setMenuOpen(false)}>
              Exchange
            </Link>
            <Link to="/open-positions" onClick={() => setMenuOpen(false)}>
              Open Positions
            </Link>
            <Link to="/closed-positions" onClick={() => setMenuOpen(false)}>
              Closed Positions
            </Link>
            <Link to="/pool" onClick={() => setMenuOpen(false)}>
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
      <Outlet />
    </div>
  );
};
