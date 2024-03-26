//📂./src/components/nav-desktop.tsx

import { routes } from "../../routes";

export const NavDesktop = () => {
  return (
    <ul className="hidden lg:flex md:flex md:items-center gap-5 text-sm">
      {routes.map((route) => {
        const { href, title } = route;
        return (
          <li key={title}>
            <a
              href={href}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all"
            >
              {title}
            </a>
          </li>
        );
      })}
      <li><w3m-button></w3m-button></li>
    </ul>
  );
};
