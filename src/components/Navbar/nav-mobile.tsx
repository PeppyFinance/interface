import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from 'react';
import '../../App.css';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { SheetContent, SheetHeader, SheetTitle, Sheet } from '../ui/sheet';
import { AnimatePresence, motion } from "framer-motion";
import classNames from 'classnames';
import { routes } from "../../routes";

export const NavMobile = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const ref = useRef(null);

  useClickAway(ref, () => setMenuOpen(false));

  return (
    <div ref={ref} className="lg:hidden md:hidden ">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <HamburgerMenuIcon className="w-7 h-full" onClick={() => setMenuOpen(true)} />
        <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
          >
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-1 mt-8">
          {routes.map((route) => {
            const { href, title } = route;
            return (
              <Link
                className={classNames('rounded-md p-3', {
                  'bg-glass/20': location.pathname === '{href}',
                })}
                to={href}
                onClick={() => setMenuOpen(false)}
              >
              {title}
            </Link>
            );
          })}
          </div>
        </SheetContent>
        </motion.div>
        )}
        </AnimatePresence>
      </Sheet>
    </div>
  );
};
