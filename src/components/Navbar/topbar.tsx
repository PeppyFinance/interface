import { NavMobile } from "./nav-mobile";
import { NavDesktop } from "./nav-desktop";

export const Topbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-glass/30 shadow-default drop-blur-md">
      <nav className="container flex items-center justify-between w-full py-1 lg:py-2">
        <div className="hidden:lg hidden:md flex justify-between">
          <NavMobile />
          <div className="right-0 hidden">
            <w3m-button/>
          </div>
        </div>
        <div className="hidden lg:flex md:flex md:items-center lg:items-center gap-5 text-sm w-full justify-between">
          <span className="text-lg text-md left-0"><a href="/"><img src="/peppy.old.png" /></a></span>
          <NavDesktop />
        </div>
      </nav>
    </div>
  );
};
