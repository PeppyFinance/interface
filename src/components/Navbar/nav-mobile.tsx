import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from 'react';
import '../../App.css';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { SheetContent, SheetHeader, SheetTitle, Sheet } from '../ui/sheet';
import classNames from 'classnames';
import { routes } from "../../routes";

export const NavMobile = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const ref = useRef(null);

  useClickAway(ref, () => setMenuOpen(false));
  // lg:hidden md:hidden
  return (
    <div ref={ref} className=" ">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <HamburgerMenuIcon className="w-7 h-full" onClick={() => setMenuOpen(true)} />
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-1 mt-8">
          {routes.map((route) => {
            const { href, title,icon } = route;
            return (
              <Link key={title}
                className={classNames('rounded-md p-3', {
                  'bg-glass/20': location.pathname === '{href}',
                })}
                to={href}
                onClick={() => setMenuOpen(false)}
              >
              {title} <span className="pl-1">{icon}</span>
            </Link>
            );
          })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
