import { NavMobile } from "./nav-mobile";
import { NavDesktop } from "./nav-desktop";

export const Topbar = () => {
  return (
    <div className="fixed mx:auto flex top-0 left-0 right-0 drop-blur-md z-40">
      <nav className="container flex items-center justify-between w-full px-3 py-1 lg:py-2">
        <div className="hidden:lg hidden:md flex justify-between gap-5 w-full">
          <div className="left-0">
            <a href="/"><img src="/peppy.finance.icon-128.png" className="h-[48px]"/></a>
          </div>
          <div className="md:hidden order-last flex gap-5 py-2">
            <w3m-button/>
            <NavMobile />
          </div>
        </div>
        <div className="hidden lg:flex md:flex md:items-center lg:items-center gap-5 text-sm w-full justify-end">
          <NavDesktop/>
        </div>
      </nav>
    </div>
  );
};
