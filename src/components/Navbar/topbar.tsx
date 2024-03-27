import { NavMobile } from "./nav-mobile";
// import { NavDesktop } from "./nav-desktop";
// <div className="hidden lg:flex md:flex md:items-center lg:items-center gap-5 text-sm w-full justify-between">
// <span className="text-lg text-md left-0"><a href="/"><img src="/peppy.old.png" /></a></span>
// <NavDesktop />
// </div>


export const Topbar = () => {
  return (
    <div className="fixed top-0 w-full bg-glass/30 shadow-default backdrop-blur-md flex justify-between px-0 py-2 max-[500px]:h-12 min-[500px]:h-[56px]" id="topbar">
      <nav className="container flex items-center justify-between w-full py-1 lg:py-2">
        <div className="flex justify-between w-full">
          <NavMobile />
          <div className="right-0">
            <w3m-button/>
          </div>
        </div>
      </nav>
    </div>
  );
};
