import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Topbar } from './components/Navbar/topbar';

export const Layout = () => {
  return (
    <div className="tracking-widest h-screen flex flex-col bg-[url('/background.png')] bg-center bg-cover overflow-hidden">
      <Topbar />
      <div className="flex-auto overflow-auto w-full" id="content">
        <Outlet />
      </div>
      <footer>
      </footer>
      <Toaster position="top-center" />
    </div>
  );
};
