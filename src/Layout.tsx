import './App.css';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="tracking-widest h-full bg-[url('/background.png')] bg-center bg-cover">
      <Outlet />
    </div>
  );
};
